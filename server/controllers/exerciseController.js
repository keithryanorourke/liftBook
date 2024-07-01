require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);

const getAllExercises = (req, res, next) => {
	const { userId } = req.decoded;
	const exerciseList = [];
	knex("exercises")
		.where({ user_id: null })
		.then((data) => {
			exerciseList.push(...data);
			return knex("exercises").where({ user_id: userId });
		})
		.then((data) => {
			exerciseList.push(...data);
			return res.status(200).json(exerciseList);
		})
		.catch(next);
};

const getUserExercises = (req, res, next) => {
	const { userId } = req.decoded;
	knex("exercises")
		.where({ user_id: userId })
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch(next);
};

const getSingleExercise = (req, res, next) => {
	const { userId } = req.decoded;
	const { exerciseId } = req.params;
	knex("exercises")
		.where({ id: exerciseId, "user_id": userId })
		.then((data) => {
			if (data.length === 0) {
				return res.status(404).send("Exercise not found!");
			}
			return res.status(200).json(data[0]);
		})
		.catch(next);
};

const postExercise = (req, res, next) => {
	const { userId } = req.decoded;
	const newExercise = req.body;
	if (newExercise.name === undefined) {
		return res.status(400).send("Exercise name is required");
	}
	if (newExercise.muscle === undefined || newExercise.muscle.length === 0) {
		return res.status(400).send("At least one muscle group must be provided");
	}
	knex("exercises")
		.insert({
			...newExercise,
			user_id: userId,
		})
		.then((data) => {
			return res.status(201).json(data);
		})
		.catch(next);
};

const putExercise = (req, res, next) => {
	const { userId } = req.decoded;
	const newExercise = req.body;
	if (newExercise.name === undefined) {
		return res.status(400).send("Exercise name is required");
	}
	if (newExercise.muscle === undefined || newExercise.muscle.length === 0) {
		return res.status(400).send("At least one muscle group must be provided");
	}
	knex("exercises")
		.where({ id: newExercise.id, user_id: userId })
		.update({
			...newExercise,
			user_id: userId,
		})
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch(next);
};

const deleteExercise = (req, res, next) => {
	const { userId } = req.decoded;
	const { exerciseId } = req.params;
	knex("exercises")
		.where({ id: exerciseId, user_id: userId })
		.delete()
		.then((data) => {
			if (data === 0) {
				return res.status(404).send("Exercise not found!");
			}
			return res
				.status(200)
				.send(`Exercise ${exerciseId} succesfully deleted!`);
		})
		.catch((err) => {
			next(err)
		});
};

module.exports = {
	getAllExercises,
	getUserExercises,
	getSingleExercise,
	postExercise,
	putExercise,
	deleteExercise,
};
