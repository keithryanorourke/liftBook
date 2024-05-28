require("dotenv").config();
const { KEY, NODE_ENV } = process.env;
const knex = require("knex")(require("../knexfile")[NODE_ENV]);
const bcrypt = require("bcrypt");
const createJwt = require('../utils').createJwt;

const postAccount = (req, res) => {
	const newUser = req.body;
	// Validate user object
	if (!newUser.password) {
		res.status(400).send("Password required for sign up");
	}
	if (!newUser.username) {
		res.status(400).send("Username required for sign up");
	}
	// Check if username is already used
	knex("users")
		.where({ username: newUser.username })
		.then((data) => {
			if (data.length) {
				return res.status(400).send("username already exists");
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
			delete userToAdd.password;
			const token = createJwt(data[0].id, KEY);
			return res.status(200).json(token);
		})
		.catch((err) => {
			return res.status(400).send(`Error creating account: ${err}`);
		});
};

const login = async (req, res) => {
	const user = req.body;
	knex("users")
		.where({ username: user.username })
		.then((data) => {
			if (!bcrypt.compareSync(user.password, data[0].password)) {
				return res.status(400).send("Incorrect password");
			}
			const token = createJwt(data[0].id, KEY);
			return res.status(200).json(token);
		})
		.catch((err) => {
			return res
				.status(404)
				.send(`Username does not match any existing account! ${err}`);
		});
};

const getSettings = async (req, res) => {
	const { userId } = req.decoded;
	knex.select(
		"mode",
		"trackDifficulty",
		"preferredMetric",
		"trackPercentageOfMax"
	)
		.from("users")
		.where({ id: userId })
		.then((response) => {
			return res.status(200).json(response[0]);
		})
		.catch((error) => {
			return res.status(404).send("User not found!");
		});
};

const putSettings = async (req, res) => {
	const { userId } = req.decoded;
	const settings = req.body;
	knex("users")
		.where({ id: userId })
		.update({ ...settings })
		.then((response) => {
			return res.status(200).send("settings succesfully updated!");
		})
		.catch((err) => {
			return res
				.status(400)
				.send(
					`Incorrect settings object provided OR user does not exist. ${err}`
				);
		});
};

module.exports = {
	postAccount,
	login,
	getSettings,
	putSettings,
};
