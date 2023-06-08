const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const handleNewUser = asyncHandler(async (req, res) => {
    const {firstname, lastname, displayName, email, password} = req.body
    if(!firstname || !displayName || !email || !password) { return res.status(400).json({'message' : 'Username, Email and Password are required.'}) }
    // check duplicate emails
    const duplicate = await User.findOne({email}).exec()
    if(duplicate){return res.status(409).json({'message': 'Email already in use.'})}

    try {
        //encrypt
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.create({
            "firstname" : firstname,
            "lastname" : lastname,
            "displayName" : displayName,
            "email" : email,
            "password" : hashedPwd
        })
        console.log(result)

        res.status(201).json({'success' : `New user ${user} created`})
    } catch(err) { res.status(500).json({'message': err.message}) }
})

module.exports = { handleNewUser }