const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)


router.post('/signup', (req, res) => {
  console.log("Received post request")
  let newUser = req.body
  knex('users')
  .where({username: newUser.username})
  .then(data => {
    console.log(data)
    if (data) {
      return res.status(400).send("username already exists")
    }
    if(!newUser.password) {
      return res.status(400).send("Password required for sign up")
    }
    if(!newUser.username) {
      return res.status(400).send("Username required for sign up")
    }
  if(newUser.mode === 'basic') {
    newUser = {...newUser, trackDifficulty: false, preferredMetric: "RPE", trackPercentageOfMax: false}
  }
  console.log(newUser)
  knex('users')
  .insert(newUser)
  .then(data => {
    return res.status(200).json(newUser)
  })
  .catch(err => {
    return res.status(400).send(`Error creating account: ${err}`)
  })
  })
})

router.post('/login', (req, res) => {

})

module.exports=router