require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);

const getUserWorkouts = (req, res) => {
	const { userId } = req.decoded;
	knex.from("users")
		.innerJoin("workouts", "users.id", "workouts.user_id")
		.select("workouts.id", "workouts.name", "workouts.timestamp")
		.where({ user_id: userId })
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(`Could not retrieve user workouts. ${err}`);
		});
};

const getSpecificWorkout = (req, res) => {
	const { userId } = req.decoded;
	const { workoutId } = req.params;
	knex("workouts")
		.where({ user_id: userId, id: workoutId })
		.then((response) => {
			if (response.length) {
				return res.status(200).json(response[0]);
			}
			return res
				.status(404)
				.send(`Workout not found within user account!`);
		})
		.catch((err) => {
			return res
				.status(500)
				.send(
					`Could not retrieve specific workout, please submit a valid workoutId that is associated with the correct user account. ${err}`
				);
		});
};

const deleteWorkout = (req, res) => {
	const { userId } = req.decoded;
	const { workoutId } = req.params;
	knex.from("workouts")
		.where({ id: workoutId, user_id: userId })
		.delete()
		.then((response) => {
			return res.status(200).send("Workout deleted.");
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`Delete failed, please submit a valid workout id that is associated with the correct user account. ${err}`
				);
		});
};

const postWorkout = (req, res) => {
	const { userId } = req.decoded;
	const newWorkout = req.body;
	knex("workouts")
		.insert({
			name: newWorkout.name || "Freestyle Workout",
			user_id: userId,
		})
		.then((response) => {
			return res.status(201).json(response);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`Workout not added. Please submit a valid workout object. ${err}`
				);
		});
};

const putWorkout = (req, res) => {
	const { userId } = req.decoded;
	const newWorkout = req.body;
	const { workoutId } = req.params;
	knex("workouts")
		.where({ id: workoutId, user_id: userId })
		.update({
			name: newWorkout.name || "Freestyle Workout",
		})
		.then((response) => {
			return res
				.status(200)
				.send(`Workout renamed to ${newWorkout.name}`);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`Workout not edited. Please submit a valid workout object and id associated with the correct user account. ${err}`
				);
		});
};

module.exports = {
	getUserWorkouts,
	getSpecificWorkout,
	deleteWorkout,
	postWorkout,
	putWorkout,
};
