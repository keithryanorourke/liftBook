const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authorize = require ("../middleware/authorize").authorize;

require('dotenv').config()
const {KEY} = process.env

router.post('/signup', (req, res) => {
  console.log("Received post request")
  let newUser = req.body
  knex('users')
  .where({username: newUser.username})
  .then(data => {
    if (data.length) {
      return res.status(401).send("username already exists")
    }
    if(!newUser.password) {
      return res.status(402).send("Password required for sign up")
    }
    if(!newUser.username) {
      return res.status(403).send("Username required for sign up")
    }
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    newUser = {...newUser, mode:"basic", trackDifficulty: false, preferredMetric: "RPE", trackPercentageOfMax: false}
    // console.log(newUser)
    knex('users')
    .insert(newUser)
    .then(data => {
      console.log(data[0])
      delete newUser.password
      const token = jwt.sign({userId: data[0]}, KEY)
      return res.status(200).json(token)
    })
    .catch(err => {
      return res.status(405).send(`Error creating account: ${err}`)
    })
  })
})

router.post('/login', (req, res) => {
  const user = req.body
  knex('users')
  .where({username: user.username})
  .then(data => {
    if (!bcrypt.compareSync(user.password, data[0].password)) {
      return res.status(400).send("Incorrect password")
    }
    console.log(data[0].id)
    const token = jwt.sign({userId: data[0].id}, KEY)
    return res.status(200).json(token)
  })
  .catch(err => {
    return res.status(404).send("Username does not match any existing account!")
  })
})

router.put('/settings', (req, res) => {
  const {userId} = req.decoded
  const settings = req.body
  knex('users')
  .where({id: userId})
  .update({...settings})
  .then(response => {
    console.log(response)
    return res.status(200).send("settings succesfully updated!")
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send("Incorrect settings object provided")
  })
  return res.status(404).send("User not found!")
})

router.get("/check-auth", authorize, (_req, res) => {
  console.log("Good to go!")
  return res.status(200).send("Valid JWT!")
})

module.exports=router