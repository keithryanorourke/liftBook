const express = require('express')
const app = express()
const cors = require('cors')
const accountRoutes = require('./routes/accountRoutes.js')
const liftRoutes = require('./routes/liftRoutes.js')
const workoutRoutes = require('./routes/workoutRoutes.js')
const exerciseRoutes = require('./routes/exerciseRoutes')
const morgan = require('morgan')
const { errorHandler } = require('./middleware/errorHandler.js')

require('dotenv').config()
const {PORT, CLIENT_HOSTNAME} = process.env

app.use(express.json())
app.use(cors({
    origin: CLIENT_HOSTNAME
}))
app.use(morgan('tiny'))

app.use('/account', accountRoutes)
app.use('/lifts', liftRoutes)
app.use("/workout", workoutRoutes)
app.use('/exercises', exerciseRoutes)

app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`))