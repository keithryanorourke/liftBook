const express = require('express')
const router = express.Router()
const authorize = require ("../middleware/authorize").authorize;
const accountController = require('../controllers/accountController')

const {createAccount,
  login,
  getSettings,
  editSettings,
  checkAuth} = accountController

require('dotenv').config()
const {KEY} = process.env

router.post('/signup', createAccount)

router.post('/login', login)

router.get("/settings", authorize, getSettings)

router.put('/settings', authorize, editSettings)

router.get("/check-auth", authorize, checkAuth)

module.exports=router