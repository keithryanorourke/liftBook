const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;

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

router.post("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const newExercise = req.body
  knex('exercises')
  .insert({
    ...newExercise, user_id: userId
  })
})


module.exports = router