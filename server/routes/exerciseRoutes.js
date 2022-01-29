const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;

// Get full list of default exercises AND exercises linked to user account
router.get("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const exerciseList = []
  knex('exercises')
  .where({user_id: null})
  .then(response => {
    exerciseList.push(...response)
    knex('exercises')
    .where({user_id: userId})
    .then(response => {
      if(response.length) {
        exerciseList.push(...response)
      }
      return res.status(200).json(exerciseList)
    })
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send('Exercise list not retrieved')
  })
})

// Get list of exercises linked to user account 
router.get("/user", authorize, (req, res) => {
  const {userId} = req.decoded
  knex('exercises')
  .where({user_id: userId})
  .then(response => res.status(200).json(response))
  .catch(error => res.status(400).send(error))
})

// Post user submitted exercise
router.post("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const newExercise = req.body
  knex('exercises')
  .insert({
    ...newExercise, user_id: userId
  })
  .then(response => res.status(201).json(response))
  .catch(error => res.status(400).send("Exercise not created, may be a duplicate."))
})


module.exports = router