require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/connectDB')

const PORT = 3500 || 80

connectDB()
app.use(cors(corsOptions))

app.use(express.json())


mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`)
})