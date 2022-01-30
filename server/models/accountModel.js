const knex = require('knex')(require('../knexfile').development)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()
const {KEY} = process.env

const insertAccount = async(newUser) => {
  // Validate user object
  if(!newUser.password) {
    return {code: 400, message: "Password required for sign up"}
  }
  if(!newUser.username) {
    return {code: 400, message: "Username required for sign up"}
  }
  let response

  // Check if username is already used
  try {
    response = await knex('users')
    .where({username: newUser.username})
    .then(data => {
      console.log(data.length)
      if (data.length) {
        return  {code: 400, message: "username already exists"}
      }
      
    })
  } catch(error) {
    return {code:400, message:"First try block failed"}
  }

  // Hash password and store in db for later comparisons
  if(!response) {
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    newUser = {...newUser, mode:"basic", trackDifficulty: false, preferredMetric: "RPE", trackPercentageOfMax: false}
    try {
      response = await knex('users')
      .insert(newUser)
      .then(data => {
        delete newUser.password
        const token = jwt.sign({userId: data[0]}, KEY)
        return {user: token, code: 200}
      })
      .catch(err => {
        return {code: 400, message: `Error creating account: ${err}`}
      })
    } catch(error) {
      return {code: 400, message: "Second try block failed"}
    }
  }
  return response
}

const checkLogin = async(user) => {
  let response
  try {
  response = await knex('users')
  .where({username: user.username})
  .then(data => {
    if (!bcrypt.compareSync(user.password, data[0].password)) {
      return {code: 400, message: "Incorrect password"}
    }
    const token = jwt.sign({userId: data[0].id}, KEY)
    return {code: 200, user: token}
  })
  .catch(err => {
    return {code: 404, message: "Username does not match any existing account!"}
  })
  } catch(error) {
    return {code: 500, message: "Try block failed"}
  } 
  return response
}

const findSettings = async(userId) => {
  let response
  try {
    response = await knex
    .select('mode', 'trackDifficulty', "preferredMetric", 'trackPercentageOfMax')
    .from('users')
    .where({id: userId})
    .then(response => {
      return {code: 200, settings: response[0]}
    })
    .catch(error => {
      return {code: 404, message: "User not found!"}
    })
  } catch(error) {
    return {code: 500, message: "Try block failed"}
  }
  return response
}

const changeSettings = async(userId, settings) => {
  let response;
  try {
    response = await knex('users')
    .where({id: userId})
    .update({...settings})
    .then(response => {
      return {code: 200, message: "settings succesfully updated!"}
    })
    .catch(error => {
      return {code: 400, message: "Incorrect settings object provided OR user does not exist"}
    })
  } catch(error) {
    return {code: 500, message: "Try block failed"}
  }
  return response
}

module.exports = {
  insertAccount,
  checkLogin,
  findSettings,
  changeSettings,
}