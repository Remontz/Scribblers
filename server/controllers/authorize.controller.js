const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const cookies = req.cookies
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`)

    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({'message' : 'Email and Password required for logging in.'})

    const foundUser = await User.findOne({email}).exec()
    if(!foundUser) return res.status(401).json({'message' : 'User not found.'})

    const matchPwd = await bcrypt.compare(password, foundUser.password)
    if(matchPwd) {
        const roles = Object.values(foundUser.roles).filter(Boolean)
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "useremail" : foundUser.email,
                    "userdisplay" : foundUser.displayName,
                    "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn: '10m'}
        )
        const newRefreshToken = jwt.sign(
            { "userdisplay" : foundUser.displayName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        let newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt)

        if(cookies?.jwt) {
            const refreshToken = cookies.jwt
            const foundToken = await User.findOne({ refreshToken }).exec()

            if(!foundToken) {
                console.log('attempted refresh token reuse at login!')
                newRefreshTokenArray = []
            }

            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        }


        // save refreshToken w/current User
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
        const result = await foundUser.save()
        console.log(result)
        console.log(roles)

        res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000 })
        
        res.json({ accessToken })
        
    } else {
        res.sendStatus(401).json({'message' : 'Incorrect Password'})
    }
}

module.exports = { handleLogin }