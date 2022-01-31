const accountModel = require('../models/accountModel.js')
const {createAccount, authenticateLogin, retrieveSettings, editSettings} = accountModel

const postAccount = async(req, res) => {
  let newUser = req.body
  const response = await createAccount(newUser)
  if(response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(201).json(response.user)
}

const login = async(req, res) => {
  const user = req.body
  const response = await authenticateLogin(user)
  if(response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(200).json(response.user)
}

const getSettings = async(req, res) => {
  const {userId} = req.decoded
  const response = await retrieveSettings(userId)
  if(response.message) {
    return res.status(response.code).send(response.message)
  }
  return res.status(200).json(response.settings)
}

const putSettings = async(req, res) => {
  const {userId} = req.decoded
  const settings = req.body
  const response = await editSettings(userId, settings)
  return res.status(response.code).send(response.message)
}

const checkAuth = async(_req, res) => {
  return res.status(200).send("Valid JWT!")
}

module.exports = {
  postAccount,
  login,
  getSettings,
  putSettings,
  checkAuth
}