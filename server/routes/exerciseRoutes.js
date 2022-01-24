const express = require('express')
const router = express.Router()
const knex = require('knex')(require('../knexfile').development)
const authorize = require ("../middleware/authorize").authorize;

router.post("/", authorize, (req, res) => {
  const {userId} = req.decoded
  const newExercise = req.body
  knex('exercises')
  .insert({
    ...newExercise, user_id: userId
  })
})


module.exports = router