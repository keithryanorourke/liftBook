const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize").authorize;
const exerciseController = require("../controllers/exerciseController");

const {
	getAllExercises,
	getUserExercises,
	getSingleExercise,
	postExercise,
	putExercise,
	deleteExercise,
} = exerciseController;

router
	.route("/")
	// Get full list of default exercises AND exercises linked to user account
	.get(authorize, getAllExercises)
	// Post user submitted exercise
	.post(authorize, postExercise)
	// Edit single user exercise
	.put(authorize, putExercise);

// Get list of exercises linked to user account
router.get("/user", authorize, getUserExercises);

// Get a single exercise by id
router.get("/single/:exerciseId", authorize, getSingleExercise);

// Delete single user exercise
router.delete("/:exerciseId", authorize, deleteExercise);

module.exports = router;
