const express = require('express')
const app = express()
const cors = require('cors')
const knex = require('knex')(require('./knexfile').development)
const jwt = require('jsonwebtoken')
const authRoutes = ('./routes/authRoutes.js')
const liftRoutes = ('./routes/liftRoutes.js')
const workoutRouts = ('./routes/workoutRouts.js')

app.use(express.json())
app.use(cors())


require('dotenv').config()
const {PORT, BACKEND_URL} = process.env

app.listen(PORT, console.log(`Server running on port ${PORT}`))