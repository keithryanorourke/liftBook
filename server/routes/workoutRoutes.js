const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile").development);
const workoutController = require("../controllers/workoutController");
const authorize = require("../middleware/authorize").authorize;

const {
	getUserWorkouts,
	getSpecificWorkout,
	deleteWorkout,
	postWorkout,
	putWorkout,
} = workoutController;

router
	.route("/")
	// Get all workouts for specific user
	.get(authorize, getUserWorkouts)
	// Create new workout
	.post(authorize, postWorkout);

router
	.route("/:workoutId")
	// Get specific workout from user account
	.get(authorize, getSpecificWorkout)
	// Rename workout
	.put(authorize, putWorkout)
	// Delete specific workout
	.delete(authorize, deleteWorkout);

module.exports = router;
