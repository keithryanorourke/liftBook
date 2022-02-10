const express = require('express')
const app = express()
const cors = require('cors')
const checkHost = require('./middleware/checkHost').checkHost
const accountRoutes = require('./routes/accountRoutes.js')
const liftRoutes = require('./routes/liftRoutes.js')
const workoutRoutes = require('./routes/workoutRoutes.js')
const exerciseRoutes = require('./routes/exerciseRoutes')

app.use(express.json())
app.use(cors())
app.use(checkHost)


app.use('/account', accountRoutes)
app.use('/lifts', liftRoutes)
app.use("/workouts", workoutRoutes)
app.use('/exercises', exerciseRoutes)

require('dotenv').config()
const {PORT, BACKEND_URL} = process.env


app.listen(PORT, console.log(`Server running on port ${PORT}`))