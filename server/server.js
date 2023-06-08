require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/connectDB')

// Possibly needed:
// verifyJWT = require('.middleware/verifyJWT') **to protect(verify access token) for all routes
// cookieParser = require('cookie-parser') **middleware for cookies

const PORT = 3500 || 80

connectDB()
app.use(cors(corsOptions))

app.use(express.json())

//ROUTES
// ROUTES BEFORE VERIFYING JWT
// '/', '/register', '/authorize', '/refresh', '/logout'
app.use('/api/register', require('./routes/api/register.routes'))
app.use('/api/authorize', require('./routes/api/authorize.routes'))

// ROUTES AFTER (verifyJWT)
// all content routes
app.use('/api/user', require('./routes/api/user.routes'))

mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`)
})