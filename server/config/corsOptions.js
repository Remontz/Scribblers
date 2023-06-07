const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200
}

module.exports = corsOptions