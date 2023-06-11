const verifyRoles = (...allowedRoles) => {
    return(req, res, next) => {
        if(!req?.roles) {return res.sendStatus(401).json({'message' : 'Bad request'})}
        const rolesArray = [...allowedRoles]
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)

        if(!result) {return res.sendStatus(401).json({'message' : 'Not Authorized'})}
        next()
    }
}

module.exports = verifyRoles