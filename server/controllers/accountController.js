const accountModel = require('../models/accountModel.js')

const {insertAccount, checkLogin, findSettings, changeSettings} = accountModel

const createAccount = async(req, res) => {
  let newUser = req.body
  const response = await insertAccount(newUser)
  console.log(response)
  if(response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(200).json(response.user)
}

const login = async(req, res) => {
  const user = req.body
  const response = await checkLogin(user)
  if(response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(200).json(response.user)
}

const getSettings = async(req, res) => {
  const {userId} = req.decoded
  const response = await findSettings(userId)
  if(response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(200).json(response.settings)
}

const editSettings = async(req, res) => {
  const {userId} = req.decoded
  const settings = req.body
  const response = await changeSettings(userId, settings)
  return res.status(response.code).send(response.message)
}

const checkAuth = async(_req, res) => {
  return res.status(200).send("Valid JWT!")
}

module.exports = {
  createAccount,
  login,
  getSettings,
  editSettings,
  checkAuth
}