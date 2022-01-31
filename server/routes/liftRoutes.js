const express = require('express')
const router = express.Router()
const liftController = require('../controllers/liftController')
const authorize = require ("../middleware/authorize").authorize;


const {postLift,
  putLift,
  getWorkoutLifts,
  deleteLift} = liftController

// Post a new lift
router.post("/", authorize, postLift)

// Edit existing lift
router.put("/", authorize, putLift)

// Get ALL lifts contained in one workout
router.get("/:workoutId", authorize, getWorkoutLifts)

// Delete a single lift
router.delete("/:liftId", authorize, deleteLift)


module.exports=router