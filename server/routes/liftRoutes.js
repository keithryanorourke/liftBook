const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;


// Post a new lift
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


// Edit existing lift
router.put("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const lift = req.body
  console.log(lift.id)
  knex('lifts')
  .where({id: lift.id})
  .update({
    ...lift
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

// Get ALL lifts contained in one workout
router.get("/:workoutId", authorize, (req, res) => {
  const {userId} = req.decoded
  const {workoutId} = req.params
  knex.from('workouts')
  .select(['lifts.id', 'lifts.weight', 'lifts.measure', 'lifts.reps', 
  'lifts.difficulty', 'lifts.metric', 'lifts.percentageOfMax', 
  'lifts.userId', 'exercises.name', 'exercises.muscle'])
  .innerJoin('lifts', 'workouts.id', 'lifts.workout_id')
  .innerJoin('exercises', 'exercises.id', 'lifts.exercise_id')
  .where({userId: userId, workout_id: workoutId})
  .then(response => {
    console.log(response[0])
    return res.status(200).json(response)
  })
  .catch(error => {
    console.log(error)
    return res.status(400).send("Ya done goofed")
  })
})

// Delete a single lift
router.delete("/:liftId", authorize, (req, res) => {
  const {userId} = req.decoded
  const {liftId} = req.params
  knex('lifts')
  .where({id: liftId, userId: userId})
  .delete()
  .then(response => {
    console.log(response)
    return res.status(200).send("Lift succesfully deleted!")
  })
  .catch(error => {
    return res.status(400).send("Lift not found OR lift was not associated with user account")
  })
})


module.exports=router