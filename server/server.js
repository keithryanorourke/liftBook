const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const accountRoutes = require('./routes/accountRoutes.js')
const liftRoutes = require('./routes/liftRoutes.js')
const workoutRoutes = require('./routes/workoutRoutes.js')

app.use(express.json())
app.use(cors())

app.use('/account', accountRoutes)
app.use('/lifts', liftRoutes)
app.use("/workouts", workoutRoutes)

require('dotenv').config()
const {PORT, BACKEND_URL} = process.env

app.listen(PORT, console.log(`Server running on port ${PORT}`))