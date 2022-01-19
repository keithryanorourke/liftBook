const jwt = require('jsonwebtoken')

require('dotenv').config()
const {KEY} = process.env

const authorize = (req, res, next) => {
  const token = req.headers.authorization.split(" ").pop()
  jwt.verify(token, KEY, (err, decoded) => {
    if(err) {
      return res.status(400).send("invalid JWT")
    }
    else {
      req.decoded = decoded
      next()
    }
  })
}