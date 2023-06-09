const express = require('express')
const router = express.Router()
const {handleLogin} = require('../../controllers/authorize.controller')

router.post('/', handleLogin)

module.exports = router