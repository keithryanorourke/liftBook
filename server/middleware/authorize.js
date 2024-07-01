const jwt = require('jsonwebtoken')

require('dotenv').config()
const { KEY } = process.env

const authorize = (req, res, next) => {
  let token;
  req.headers.authorization ? token = req.headers.authorization.split(" ").pop() : null
  if (token) {
    jwt.verify(token, KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token")
      }
      else {
        if (new Date(decoded.expiration) < Date.now()) {
          return res.status(401).send("Token expired")
        }
        req.decoded = decoded
        next()
      }
    })
  }
}

module.exports = { authorize };