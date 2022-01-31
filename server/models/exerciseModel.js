const knex = require('knex')(require('../knexfile').development)

const retrieveAllExercises = async(userId) => {
  let response
  const exerciseList = []
  try {
    response = await knex('exercises')
    .where({user_id: null})
    .then(response => {
      exerciseList.push(...response)
      knex('exercises')
      .where({user_id: userId})
      .then(response => {
        if(response.length) {
          exerciseList.push(...response)
        }
      })
      return {code: 200, exercises: exerciseList}
    })
    .catch(error => {
      return {code: 400, message: "Exercise list not retrieved"}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed."}
  }
  return response
}

const retrieveUserExercises = async(userId) => {
  let response
  try {
    response = await knex('exercises')
    .where({user_id: userId})
    .then(response => {
    return {code: 200, exercises: response}
    }
      )
    .catch(error => {
      return {code: 400, error: error}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed."}
  }
  return response
}

const createExercise = async(userId, newExercise) => {
  let response
  try {
  response = await knex('exercises')
    .insert({
      ...newExercise, user_id: userId
    })
    .then(response => {
      return {code: 201, exercise: response}
    })
    .catch(error => {
      return {code: 400, message: "Exercise not created, may be a duplicate."}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed."}
  }
  return response
}

const editExercise = async(userId, newExercise) => {
  let response
  try {
    response = await knex('exercises')
    .where({id: newExercise.id, user_id: userId})
    .update({
      ...newExercise, user_id: userId
    })
    .then(response => {
      return {code: 200, exercise: response}
    })
    .catch(error => {
      return {code: 400, message: "Exercise not created, may be a duplicate."}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed."}
  }
  return response
}

const removeExercise = async(userId, exerciseId) => {
  let response 
  try {
    response = await knex('exercises')
    .where({id: exerciseId, user_id: userId})
    .delete()
    .then(response => {
      return {code: 200, message: `Exercise ${exerciseId} succesfully deleted!`}
    })
    .catch(error => {
      return {code: 404, message: `Exercise ${exerciseId} was not deleted. It either does not exist or does not belong to your account.`}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed."}
  }
  return response
}

module.exports = {
  retrieveAllExercises,
  retrieveUserExercises,
  createExercise,
  editExercise,
  removeExercise
}