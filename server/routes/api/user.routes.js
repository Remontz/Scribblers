const express = require('express')
const router = express.Router()
const {viewAllUsers, viewOneUser, updateUser, deleteUser} = require('../../controllers/user.controller')

router.route('/')
    .get(viewAllUsers)
    .put(updateUser)
    .delete(deleteUser)
router.route('/:id')
    .get(viewOneUser)

module.exports = router