const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;

router.get("/", authorize, (req, res) => {
  const {userId} = req.decoded
  console.log("received")
  knex.from('users')
  .innerJoin('workouts', 'users.id', 'workouts.user_id')
  .select('workouts.id', 'workouts.name')
  .where({user_id: userId})
  .then(response => {
    console.log(response, "THEN")
    return res.status(200).send(response)
  })
  .catch(error => {
    console.log(error, "ERROR")
    return res.status(400).send(error)
  })
})

router.post("/", authorize, (req, res) => {
  const {userId} = req.decoded
  knex('workouts')
  .insert({
    name: (req.body.name || "Freestyle Workout"), user_id: userId
  })
  .then(response => {
    console.log(response)
    return res.status(200).send("Workout succesfully added!")
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send("Workout not added!!")
  })
})


module.exports=router