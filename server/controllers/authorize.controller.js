const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({'message' : 'Email and Password required for logging in.'})

    const foundUser = await User.findOne({email}).exec()
    if(!foundUser) return res.status(401).json({'message' : 'User not found.'})

    const matchPwd = await bcrypt.compare(password, foundUser.password)
    if(matchPwd) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "useremail" : foundUser.email,
                    "userdisplay" : foundUser.displayName
                }
            },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn: '300s'}
        )
        const refreshToken = jwt.sign(
            { "userdisplay" : foundUser.displayName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // save refreshToken w/current User
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', /* secure: true, */ maxAge: 24*60*60*1000 })
        
        res.json({ accessToken })
    } else {
        res.sendStatus(401).json({'message' : 'Incorrect Password'})
    }
}

module.exports = { handleLogin }