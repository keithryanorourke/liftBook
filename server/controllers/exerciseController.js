const exerciseModel = require('../models/exerciseModel')
const knex = require('knex')(require('../knexfile').development)

const {retrieveAllExercises, retrieveUserExercises, retrieveSingleExercise, createExercise, editExercise, removeExercise} = exerciseModel

const getAllExercises = async(req, res) => {
  const response = await retrieveAllExercises(req.decoded.userId)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.exercises)
}

const getUserExercises = async(req, res) => {
  const response = await retrieveUserExercises(req.decoded.userId)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.exercises)
}

const getSingleExercise = async(req, res) => {
  const response = await retrieveSingleExercise(req.params.exerciseId)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.exercise)
}

const postExercise = async(req, res) => {
  const response = await createExercise(req.decoded.userId, req.body)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.exercise)
}

const putExercise = async(req, res) => {
  const response = await editExercise(req.decoded.userId, req.body)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.exercise)
}

const deleteExercise = async(req, res) => {
  const response = await removeExercise(req.decoded.userId, req.params.exerciseId)
  return res.status(response.code).send(response.message)
}


module.exports = {
  getAllExercises,
  getUserExercises,
  getSingleExercise,
  postExercise,
  putExercise,
  deleteExercise
}