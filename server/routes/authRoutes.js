const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()
const {KEY} = process.env


router.post('/signup', (req, res) => {
  console.log("Received post request")
  let newUser = req.body
  knex('users')
  .where({username: newUser.username})
  .then(data => {
    console.log(data)
    if (data.length) {
      return res.status(400).send("username already exists")
    }
    if(!newUser.password) {
      return res.status(400).send("Password required for sign up")
    }
    if(!newUser.username) {
      return res.status(400).send("Username required for sign up")
    }
    if(newUser.mode === 'basic') {
      newUser.password = bcrypt.hashSync(newUser.password, 10)
      newUser = {...newUser, trackDifficulty: false, preferredMetric: "RPE", trackPercentageOfMax: false}
    }
    console.log(newUser)
    knex('users')
    .insert(newUser)
    .then(data => {
      delete newUser.password
      return res.status(200).json(newUser)
    })
    .catch(err => {
      return res.status(400).send(`Error creating account: ${err}`)
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

})

module.exports=router