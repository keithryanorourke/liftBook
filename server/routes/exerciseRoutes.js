const express = require('express')
const router = express.Router()
const authorize = require ("../middleware/authorize").authorize;
const exerciseController = require('../controllers/exerciseController')

const {getAllExercises, getUserExercises, getSingleExercise, postExercise, putExercise, deleteExercise} = exerciseController

// Get full list of default exercises AND exercises linked to user account
router.get("/", authorize, getAllExercises)

// Get list of exercises linked to user account 
router.get("/user", authorize, getUserExercises)

// Get a single exercise by id
router.get("/single/:exerciseId", authorize, getSingleExercise)

// Post user submitted exercise
router.post("/", authorize, postExercise)

// Edit single user exercise 
router.put("/", authorize, putExercise)

// Delete single user exercise
router.delete("/:exerciseId", authorize, deleteExercise)

module.exports = router