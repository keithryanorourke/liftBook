const knex = require('knex')(require('../knexfile').development)


const createLift = async(userId, lift) => {
  let response
  try {
    response = await knex('lifts')
    .insert({
      ...lift, user_id: userId
    })
    .then(response => {
      return {code: 201, message: "Lift succesfully added!"}
    })
    .catch(error => {
      return {code: 400, message: "Lift not added!!"}
    })
  } catch(error) {
    return {code:400, message: "Try block failed."}
  }
  return response
}

const editLift = async(userId, lift) => {
  let response
  try {
    response = await knex('lifts')
    .where({id: lift.id, user_id: userId})
    .update({
      ...lift
    })
    .then(response => {
      return {code: 201, message: "Lift succesfully added!"}
    })
    .catch(error => {
      return {code: 400, message: "Lift not added!!"}
    })
  } catch(error) {
    return {code:400, message: "Try block failed."}
  }
  return response
}

const retrieveWorkoutLifts = async(userId, workoutId) => {
  let response
  try {
    response = await knex.from('workouts')
    .select(['lifts.id', 'lifts.weight', 'lifts.measure', 'lifts.reps', 
    'lifts.difficulty', 'lifts.metric', 'lifts.percentageOfMax', 
    'lifts.user_id', 'exercises.name', 'exercises.muscle'])
    .innerJoin('lifts', 'workouts.id', 'lifts.workout_id')
    .innerJoin('exercises', 'exercises.id', 'lifts.exercise_id')
    .where({'lifts.user_id': userId, workout_id: workoutId})
    .then(response => {
      return {code: 200, lifts: response}
    })
    .catch(error => {
      return {code: 400, message: "List of lifts could not be retrieved."}
    })
  } catch(error) {
    return {code:400, message: "Try block failed."}
  }
  return response
}

const removeLift = async(userId, liftId) => {
  let response
  try {
    response = await knex('lifts')
    .where({id: liftId, user_id: userId})
    .delete()
    .then(response => {
      return {code: 200, message: "Lift succesfully deleted!"}
    })
    .catch(error => {
      return {code: 404, message: "Lift not found OR lift was not associated with user account"}
    })
  } catch(error) {
    return {code:400, message: "Try block failed."}
  }
  return response
}

module.exports = {
  createLift,
  editLift,
  retrieveWorkoutLifts,
  removeLift
}