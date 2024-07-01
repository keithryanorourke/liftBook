require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);

const getUserWorkouts = (req, res, next) => {
	const { userId } = req.decoded;
	knex.from("users")
		.innerJoin("workouts", "users.id", "workouts.user_id")
		.select("workouts.id", "workouts.name", "workouts.timestamp")
		.where({ user_id: userId })
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch(next);
};

const getSpecificWorkout = (req, res, next) => {
	const { userId } = req.decoded;
	const { workoutId } = req.params;
	knex("workouts")
		.where({ user_id: userId, id: workoutId })
		.then((data) => {
			if (data.length === 0) {
				return res
					.status(404)
					.send(`Workout not found within user account!`);
			}
			return res.status(200).json(data[0]);
		})
		.catch(next);
};

const deleteWorkout = (req, res, next) => {
	const { userId } = req.decoded;
	const { workoutId } = req.params;
	knex.from("workouts")
		.where({ id: workoutId, user_id: userId })
		.delete()
		.then((data) => {
			if (data === 0) {
				return res.status(404).send("Workout not found!");
			}
			return res.status(200).send("Workout deleted.");
		})
		.catch(next);
};

const postWorkout = (req, res, next) => {
	const { userId } = req.decoded;
	const newWorkout = req.body;
	knex("workouts")
		.insert({
			name: newWorkout.name || "Freestyle Workout",
			user_id: userId,
		})
		.then((data) => {
			return res.status(201).json(data);
		})
		.catch(next);
};

const putWorkout = (req, res, next) => {
	const { userId } = req.decoded;
	const newWorkout = req.body;
	const { workoutId } = req.params;
	knex("workouts")
		.where({ id: workoutId, user_id: userId })
		.update({
			name: newWorkout.name || "Freestyle Workout",
		})
		.then((data) => {
			return res
				.status(200)
				.send(`Workout renamed to ${newWorkout.name}`);
		})
		.catch(next);
};

module.exports = {
	getUserWorkouts,
	getSpecificWorkout,
	deleteWorkout,
	postWorkout,
	putWorkout,
};
