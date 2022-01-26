const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;

router.post("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const lift = req.body
  knex('lifts')
  .insert({
    ...lift, userId: userId
  })
  .then(response => {
    console.log(response)
    return res.status(200).send("Lift succesfully added!")
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send("Lift not added!!")
  })
})

router.get("/", authorize, (req, res) => {
  const {userId} = req.decoded
  knex.from('workouts')
  .innerJoin('lifts', 'workouts.id', 'lifts.workout_id')
  .where({userId: userId})
  .innerJoin('exercises', 'exercises.id', 'lifts.exercise_id')
  .then(response => {
    console.log(response)
    return res.status(200).json(response)
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send("Ya done goofed")
  })
})


module.exports=router