const liftModel = require('../models/liftModel')

const {createLift, editLift, removeLift, retrieveWorkoutLifts} = liftModel

const postLift = async(req, res) => {
  const response = await createLift(req.decoded.userId, req.body)
  return res.status(response.code).send(response.message)
}

const putLift = async(req, res) => {
  const response = await editLift(req.decoded.userId, req.body)
  return res.status(response.code).send(response.message)
}

const getWorkoutLifts = async(req, res) => {
  const response = await retrieveWorkoutLifts(req.decoded.userId, req.params.workoutId)
  if (response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(response.code).json(response.lifts)
}

const deleteLift = async(req, res) => {
  const response = await removeLift(req.decoded.userId, req.params.liftId)
  return res.status(response.code).send(response.message)
}

module.exports = {
  postLift,
  putLift,
  getWorkoutLifts,
  deleteLift
}