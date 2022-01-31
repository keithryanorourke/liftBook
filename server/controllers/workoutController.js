const workoutModel = require('../models/workoutModel')

const {
  retrieveUserWorkouts,
  retrieveSpecificWorkout,
  removeWorkout,
  createWorkout,
  renameWorkout
} = workoutModel

const getUserWorkouts = async(req, res) => {
  const response = await retrieveUserWorkouts(req.decoded.userId)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.workouts)
}

const getSpecificWorkout = async(req, res) => {
  const response = await retrieveSpecificWorkout(req.decoded.userId, req.params.workoutId)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.workout)
}

const deleteWorkout = async(req, res) => {
  const response = await removeWorkout(req.decoded.userId, req.params.workoutId)
  return res.status(response.code).send(response.message)
}

const postWorkout = async(req, res) => {
  const response = await createWorkout(req.decoded.userId, req.body)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.workout)
}

const putWorkout = async(req, res) => {
  const response = await renameWorkout(req.decoded.userId, req.params.workoutId, req.body)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.workouts)
}

module.exports = {
  getUserWorkouts,
  getSpecificWorkout,
  deleteWorkout,
  postWorkout,
  putWorkout
}