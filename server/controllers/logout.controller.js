const User = require('../models/user.model')

const handleLogout = asyncHandler( async(req, res) => {
    // DELETE ACCESSTOKEN CLIENTSIDE!!!!!!

    const cookies = req.cookies
    if(!cookies?.jwt) { return res.sendStatus(204).json({'message' : 'No Cookies ||No Token Found'}) }

    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ refreshToken }).exec()
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        return res.sendStatus(204).json({'message' : 'No user found with refreshToken: logging out'})
    }

    //Clear the User's refreshToken
    foundUser.refreshToken = ''
    const result = await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, /* secure: true, */ sameSite: 'None', secure: true })
    res.sendStatus(204).json({ 'message' : 'Success | User Logging out & Token/Cookies Cleared' })
} )

module.exports = { handleLogout }