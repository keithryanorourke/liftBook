const express = require('express')
const router = express.Router()
const authorize = require ("../middleware/authorize").authorize;
const accountController = require('../controllers/accountController')

const {postAccount,
  login,
  getSettings,
  putSettings,
  checkAuth} = accountController

require('dotenv').config()
const {KEY} = process.env

router.post('/signup', postAccount)

router.post('/login', login)

router.get("/settings", authorize, getSettings)

router.put('/settings', authorize, putSettings)

router.get("/check-auth", authorize, checkAuth)

module.exports=router