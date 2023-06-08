const express = require('express')
const router = express.Router()
const authorizeController = require('../../controllers/authorize.controller')

router.post('/', authorizeController.handleLogin)

module.exports = router