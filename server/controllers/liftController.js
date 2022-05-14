require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);

const postLift = (req, res) => {
	const { userId } = req.decoded;
	const lift = req.body;
	knex("lifts")
		.insert({
			...lift,
			user_id: userId,
		})
		.then((response) => {
			return res.status(201).send("Lift succesfully added!");
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`Lift not succesfully added, please submit a valid lift object. ${err}`
				);
		});
};

const putLift = (req, res) => {
	const { userId } = req.decoded;
	const lift = req.body;
	knex("lifts")
		.where({ id: lift.id, user_id: userId })
		.update({
			...lift,
		})
		.then((response) => {
			return res.status(200).send("Lift succesfully edited!");
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`Lift not succesfully edited, please submit a valid lift object and ensure it belongs to this account. ${err}`
				);
		});
};

const getWorkoutLifts = async (req, res) => {
	const { userId } = req.decoded;
	const { workoutId } = req.params;
	knex.from("workouts")
		.select([
			"lifts.id",
			"lifts.weight",
			"lifts.measure",
			"lifts.reps",
			"lifts.difficulty",
			"lifts.metric",
			"lifts.percentageOfMax",
			"lifts.user_id",
			"exercises.name",
			"exercises.muscle",
		])
		.innerJoin("lifts", "workouts.id", "lifts.workout_id")
		.innerJoin("exercises", "exercises.id", "lifts.exercise_id")
		.where({ "lifts.user_id": userId, workout_id: workoutId })
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`List of lifts could not be retrieved. Potential database error. ${err}`
				);
		});
};

const getExerciseLifts = (req, res) => {
	const { userId } = req.decoded;
	const { exerciseId } = req.params;
	knex.from("exercises")
		.select([
			"lifts.id",
			"lifts.weight",
			"lifts.measure",
			"lifts.reps",
			"lifts.difficulty",
			"lifts.metric",
			"lifts.percentageOfMax",
			"lifts.user_id",
			"exercises.name",
			"exercises.muscle",
			"workouts.timestamp",
		])
		.innerJoin("lifts", "exercises.id", "lifts.exercise_id")
		.innerJoin("workouts", "workouts.id", "lifts.workout_id")
		.where({ "lifts.user_id": userId, exercise_id: exerciseId })
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(`List of lifts could not be retrieved. ${err}`);
		});
};

const deleteLift = (req, res) => {
	const { userId } = req.decoded;
	const { liftId } = req.params;
	knex("lifts")
		.where({ id: liftId, user_id: userId })
		.delete()
		.then((response) => {
			return res.status(200).send("Lift succesfully deleted!");
		})
		.catch((err) => {
			return res
				.status(404)
				.send(
					`Lift not found OR lift was not associated with user account. ${err}`
				);
		});
};

module.exports = {
	postLift,
	putLift,
	getWorkoutLifts,
	getExerciseLifts,
	deleteLift,
};
