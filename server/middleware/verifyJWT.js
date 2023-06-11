const JWT = require('jsonwebtoken')

//verifies the token
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization
    if(!authHeader?.startsWith('Bearer ')) { return res.sendStatus(401).json({'message' : 'Authorization Header not present'}) }

    const token = authHeader.split(' ')[1]
    JWT.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) { return res.sendStatus(403).json({'message' : `Forbidden: ${err}`}) }
            req.useremail = decoded.UserInfo.useremail
            req.userdisplay = decoded.UserInfo.userdisplay
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT