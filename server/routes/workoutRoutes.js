const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const workoutController = require('../controllers/workoutController')
const authorize = require ("../middleware/authorize").authorize;

const {
  getUserWorkouts,
  getSpecificWorkout,
  deleteWorkout,
  postWorkout,
  putWorkout
} = workoutController

// Get all workouts for specific user
router.get("/", authorize, getUserWorkouts)

// Get specific workout from user account
router.get("/:workoutId", authorize, getSpecificWorkout)

// Delete specific workout
router.delete("/:workoutId", authorize, deleteWorkout)

// Create new workout
router.post("/", authorize, postWorkout)

// Rename workout
router.put("/:workoutId", authorize, putWorkout)

module.exports=router