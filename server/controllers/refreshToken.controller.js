// Refreshes Access Token
const User = require('../models/user.model')
const JWT = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const handleRefreshToken = asyncHandler( async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.JWT) { return res.sendStatus(401).json( {'message' : 'Invalid Request : No token found || cookies found'} ) }
    
    const refreshToken = cookies.JWT
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async(err, decoded) => {
                if(err) {return res.sendStatus(403)  }
                console.log('attempted refresh token reuse!')
                const hackedUser = await User.findOne({ username: decoded.displayName }).exec()
                hackedUser.refreshToken = []
                const result = await hackedUser.save()
                console.log(result)
            }
        ) 
        res.sendStatus(403).json({ 'message' : 'Forbidden | No User found with proper token' }) 
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken)

    JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err) {
                console.log('expired refresh token')
                foundUser.refreshToken = [...newRefreshTokenArray]
                const result = await foundUser.save()
                console.log(result)
            }

            if(err || foundUser.email !== decoded.email) { return res.sendStatus(403).json({ 'message' : 'Forbidden User Email invalid' }) }
            
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "useremail" : foundUser.email,
                        "userdisplay" : foundUser.displayName,
                        "roles" : roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }
            )

            const newRefreshToken = jwt.sign(
                {"userdisplay" : foundUser.displayName},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )

            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
            const result = await foundUser.save()

            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000 })
            res.json({ accessToken })
        }
    )
} )

module.exports = { handleRefreshToken }

