const express = require('express')
const router = express.Router()
const authorize = require ("../middleware/authorize").authorize;
const exerciseController = require('../controllers/exerciseController')

const {getAllExercises, getUserExercises, postExercise, putExercise, deleteExercise} = exerciseController

// Get full list of default exercises AND exercises linked to user account
router.get("/", authorize, getAllExercises)

// Get list of exercises linked to user account 
router.get("/user", authorize, getUserExercises)

// Post user submitted exercise
router.post("/", authorize, postExercise)

// Edit single user exercise 
router.put("/", authorize, putExercise)

// Delete single user exercise
router.delete("/:exerciseId", authorize, deleteExercise)

module.exports = router