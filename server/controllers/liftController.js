require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);

const postLift = (req, res, next) => {
	const { userId } = req.decoded;
	const lift = req.body;
	if (lift.reps === undefined) {
		return res.status(400).send("Reps is required");
	}
	if (lift.reps <= 0) {
		return res.status(400).send("Reps must be greater than 0");
	}
	knex("lifts")
		.insert({
			...lift,
			weight: lift.weight || 0,
			user_id: userId,
		})
		.then((data) => {
			return res.status(201).send("Lift succesfully added!");
		})
		.catch(next);
};

const putLift = (req, res, next) => {
	const { userId } = req.decoded;
	const lift = req.body;
	if (lift.reps === undefined) {
		return res.status(400).send("Reps is required");
	}
	if (lift.reps <= 0) {
		return res.status(400).send("Reps must be greater than 0");
	}
	knex("lifts")
		.where({ id: lift.id, user_id: userId })
		.update({
			...lift,
			weight: lift.weight || 0,
		})
		.then((data) => {
			return res.status(200).send("Lift succesfully edited!");
		})
		.catch(next);
};

const getWorkoutLifts = async (req, res, next) => {
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
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((err) => {
			next(err)
		});
};

const getExerciseLifts = (req, res, next) => {
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
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch(next);
};

const deleteLift = (req, res, next) => {
	const { userId } = req.decoded;
	const { liftId } = req.params;
	knex("lifts")
		.where({ id: liftId, user_id: userId })
		.delete()
		.then((data) => {
			if (data === 0) {
				return res.status(404).send("Lift not found!");
			}
			return res.status(200).send("Lift succesfully deleted!");
		})
		.catch(next);
};

module.exports = {
	postLift,
	putLift,
	getWorkoutLifts,
	getExerciseLifts,
	deleteLift,
};
