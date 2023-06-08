const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) { return res.status(400).json({'message' : 'Username, Email and Password are required.'}) }
    // check duplicate emails
    const duplicate = await User.findOne({email}).exec()
    if(duplicate){return res.status(409).json({'message': 'Email already in use.'})}

    try {
        //encrypt
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.create({
            "name" : {
                "first" : name.first,
                "last" : name.last,
                "display" : name.display
            },
            "email" : email,
            "password" : hashedPwd
        })
        console.log(result)

        res.status(201).json({'success' : `New user ${user} created`})
    } catch(err) { res.status(500).json({'message': err.message}) }
}

module.exports = { handleNewUser }