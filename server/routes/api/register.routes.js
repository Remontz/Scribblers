const express = require('express')
const router = express.Router()
const {handleNewUser} = require('../../controllers/register.controller')

router.post('/', handleNewUser)

module.exports = router;