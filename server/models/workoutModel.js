const knex = require('knex')(require('../knexfile').development)


const retrieveUserWorkouts = async(userId) => {
  let response
  try {
    response = await knex.from('users')
    .innerJoin('workouts', 'users.id', 'workouts.user_id')
    .select('workouts.id', 'workouts.name', 'workouts.timestamp')
    .where({user_id: userId})
    .then(response => {
      return {code: 200, workouts: response}
    })
    .catch(error => {
      return {code: 400, message: error.message}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed"}
  }
  return response
}

const retrieveSpecificWorkout = async(userId, workoutId) => {
  let response
  try {
    response = await knex('workouts')
    .where({user_id: userId, 'id': workoutId})
    .then(response => {
      if (response.length) {
        return {code: 200, workout: response[0]}
      }
      return {code: 404, message:"Workout not found within user account!"}
    })
    .catch(error => {
      return {code: 400, message: error.message}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed"}
  }
  return response
}

const removeWorkout = async(userId, workoutId) => {
  let response
  try {
    response = await knex.from('workouts')
    .where({id: workoutId, user_id: userId})
    .delete()
    .then(response => {
      return {code: 200, message: "Workout deleted."}
    })
    .catch(error => {
      console.log(error, "delete failed")
      return {code: 400, message: "delete failed"}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed"}
  }
  return response
}

const createWorkout = async(userId, newWorkout) => {
  let response
  try {
    response = await knex('workouts')
    .insert({
      name: (newWorkout.name || "Freestyle Workout"), user_id: userId
    })
    .then(response => {
      return {code: 201, workout: response}
    })
    .catch(error => {
      return {code: 400, message: "workout not added."}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed"}
  }
  return response
}

const renameWorkout = async(userId, workoutId, newWorkout) => {
  let response
  try {
    response = await knex('workouts')
    .where({id: workoutId, user_id: userId})
    .update({
      name: (newWorkout.name || "Freestyle Workout")
    })
    .then(response => {
      return {code: 200, message:`Workout renamed to ${newWorkout.name}`}
    })
    .catch(error => {
      return {code: 400, message: "Workout rename failed"}
    })
  } catch(error) {
    return {code: 400, message: "Try block failed"}
  }
  return response
}

module.exports = {
  retrieveUserWorkouts,
  retrieveSpecificWorkout,
  removeWorkout,
  createWorkout,
  renameWorkout
}