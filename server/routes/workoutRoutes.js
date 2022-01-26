const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;


// Get all workouts for specific user
router.get("/", authorize, (req, res) => {
  const {userId} = req.decoded
  console.log("received")
  knex.from('users')
  .innerJoin('workouts', 'users.id', 'workouts.user_id')
  .select('workouts.id', 'workouts.name', 'workouts.timestamp')
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

// Get specific workout from user account

// Delete specific workout
router.delete("/:workoutId", authorize, (req, res) => {
  const {userId} = req.decoded
  knex.from('workouts')
  .where({id: req.params.workoutId, user_id: userId})
  .delete()
  .then(response => {
    console.log(response, "workout deleted!")
    return res.status(200).send("workout deleted")
  })
  .catch(error => {
    console.log(error, "delete failed")
    return res.status(400).send("deleted failed")
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
    return res.status(200).json(response[response.length-1])
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send("Workout not added!!")
  })
})


module.exports=router