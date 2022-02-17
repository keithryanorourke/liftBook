require('dotenv').config()
const {NODE_ENV} = process.env


const checkHost = (req, res, next) => {
  console.log(req.hostname, NODE_ENV)
  const matchHost = 'localhost'
  if(req.hostname === matchHost) {
    next()
  } 
  else {
    res.status(403).send(`Your host address, ${req.host}, is not permitted to access this api.`)
  }
}

module.exports = {checkHost};