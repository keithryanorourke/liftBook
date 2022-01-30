const express = require("express")
const jwt = require('jsonwebtoken')

require('dotenv').config()
const {KEY} = process.env

const authorize = (req, res, next) => {
  let token;
  req.headers.authorization ? token = req.headers.authorization.split(" ").pop() : null
  if (token) {
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
}

module.exports = {authorize};