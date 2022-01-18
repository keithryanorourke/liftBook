const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
const {PORT, BACKEND_URL} = process.env

app.listen(PORT, console.log(`Server running on port ${PORT}`))