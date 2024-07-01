const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize").authorize;
const accountController = require("../controllers/accountController");

const { postAccount, login, getSettings, putSettings } =
	accountController;

require("dotenv").config();

router.post("/signup", postAccount);

router.post("/login", login);

router
	.route("/settings")
	.get(authorize, getSettings)
	.put(authorize, putSettings);

module.exports = router;