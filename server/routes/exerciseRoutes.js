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

// Edit single user exercise 
router.put("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const newExercise = req.body
  console.log(newExercise)
  knex('exercises')
  .where({id: newExercise.id, user_id: userId})
  .update({
    ...newExercise, user_id: userId
  })
  .then(response => res.status(201).json(response))
  .catch(error => res.status(400).send("Exercise not created, may be a duplicate."))
})

// Delete single user exercise
router.delete("/:exerciseId", authorize, (req, res) => {
  const {userId} = req.decoded
  const {exerciseId} = req.params
  knex('exercises')
  .where({id: exerciseId, user_id: userId})
  .delete()
  .then(response => res.status(200).send(`Exercise ${exerciseId} succesfully deleted!`))
  .catch(error => res.status(400).send(`Exercise ${exerciseId} was not deleted. It either does not exist or does not belong to your account.`))
})

module.exports = router