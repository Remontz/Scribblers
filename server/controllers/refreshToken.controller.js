// Refreshes Access Token
const User = require('../models/user.model')
const JWT = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const handleRefreshToken = asyncHandler( async(req, res) => {
    const cookies = req.cookies
    if(!cookies?.JWT) { return res.sendStatus(401).json( {'message' : 'Invalid Request : No token found || cookies found'} ) }
    
    const refreshToken = cookies.JWT
    
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser) { res.sendStatus(403).json({ 'message' : 'Forbidden | No User found with proper token' }) }

    JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) { return res.sendStatus(403).json({ 'message' : 'Forbidden User Email invalid' }) }
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "useremail" : foundUser.email,
                        "userdisplay" : foundUser.displayName
                    }
                },
                process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s' }
            )
            res.json({ accessToken })
        }
    )
} )

module.exports = { handleRefreshToken }

