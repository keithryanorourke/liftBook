require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);

const getAllExercises = (req, res) => {
	const { userId } = req.decoded;
	const exerciseList = [];
	knex("exercises")
		.where({ user_id: null })
		.then((response) => {
			exerciseList.push(...response);
			return knex("exercises").where({ user_id: userId });
		})
		.then((response) => {
			exerciseList.push(...response);
			return res.status(200).json(exerciseList);
		})
		.catch((err) => {
			return res
				.status(500)
				.send(
					`Database error, exercise list could not be retrieved! ${err}`
				);
		});
};

const getUserExercises = (req, res) => {
	const { userId } = req.decoded;
	knex("exercises")
		.where({ user_id: userId })
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			return res
				.status(500)
				.message(
					`Database error, exercise list could not be retrieved! ${err}`
				);
		});
};

const getSingleExercise = (req, res) => {
	const { exerciseId } = req.params;
	knex("exercises")
		.where({ id: exerciseId })
		.then((response) => {
			return res.status(200).json(response[0]);
		})
		.catch((err) => {
			return res
				.status(500)
				.send(
					`Database error, exercise could not be retrieved! ${err}`
				);
		});
};

const postExercise = (req, res) => {
	const { userId } = req.decoded;
	const newExercise = req.body;
	knex("exercises")
		.insert({
			...newExercise,
			user_id: userId,
		})
		.then((response) => {
			return res.status(201).json(response);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(`Exercise not created, may be a duplicate. ${err}`);
		});
};

const putExercise = (req, res) => {
	const { userId } = req.decoded;
	const newExercise = req.body;
	knex("exercises")
		.where({ id: newExercise.id, user_id: userId })
		.update({
			...newExercise,
			user_id: userId,
		})
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			return res
				.status(400)
				.send(`Exercise not created, may be a duplicate. ${err}`);
		});
};

const deleteExercise = (req, res) => {
	const { userId } = req.decoded;
	const { exerciseId } = req.params;
	knex("exercises")
		.where({ id: exerciseId, user_id: userId })
		.delete()
		.then((response) => {
			return res
				.status(200)
				.send(`Exercise ${exerciseId} succesfully deleted!`);
		})
		.catch((err) => {
			return res
				.status(404)
				.send(
					`Exercise ${exerciseId} was not deleted. It either does not exist or does not belong to your account. ${err}`
				);
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
