require("dotenv").config();
const { NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);
const bcrypt = require("bcrypt");
const createJwt = require('../utils').createJwt;

const postAccount = (req, res, next) => {
	const newUser = req.body;
	// Validate user object
	if (!newUser.username) {
		return res.status(400).send("Username is required");
	}
	if (!newUser.password) {
		return res.status(400).send("Password is required");
	}
	// Check if username is already used
	knex("users")
		.where({ username: newUser.username })
		.then((data) => {
			if (data.length) {
				return res.status(400).send("Username already exists");
			}
		});

	// Hash password and store in db for later comparisons
	newUser.password = bcrypt.hashSync(newUser.password, 10);
	userToAdd = {
		...newUser,
		mode: "basic",
		trackDifficulty: false,
		preferredMetric: "RPE",
		trackPercentageOfMax: false,
	};
	knex("users")
		.insert(userToAdd)
		.then((data) => {
			const token = createJwt(data[0]);
			return res.status(200).json(token);
		})
		.catch(next);
};

const login = async (req, res, next) => {
	const user = req.body;
	// Validate user object
	if (!user.username) {
		return res.status(400).send("Username is required");
	}
	if (!user.password) {
		return res.status(400).send("Password is required");
	}
	knex("users")
		.where({ username: user.username })
		.then((data) => {
			if (data.length === 0) {
				return res.status(400).send("Incorrect username or password");

			}
			if (!bcrypt.compareSync(user.password, data[0].password)) {
				return res.status(400).send("Incorrect username or password");
			}
			const token = createJwt(data[0].id);
			return res.status(200).json(token);
		})
		.catch(next);
};

const getSettings = async (req, res, next) => {
	const { userId } = req.decoded;
	knex.select(
		"mode",
		"trackDifficulty",
		"preferredMetric",
		"trackPercentageOfMax"
	)
		.from("users")
		.where({ id: userId })
		.then((data) => {
			if (data.length === 0) {
				return res.status(404).send("User not found!");
			}
			return res.status(200).json(data[0]);
		})
		.catch(next);
};

const putSettings = async (req, res, next) => {
	const { userId } = req.decoded;
	const settings = req.body;
	knex("users")
		.where({ id: userId })
		.update({ ...settings })
		.then((data) => {
			return res.status(200).send("settings succesfully updated!");
		})
		.catch(next);
};

module.exports = {
	postAccount,
	login,
	getSettings,
	putSettings,
};
