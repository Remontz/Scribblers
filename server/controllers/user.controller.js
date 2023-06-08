// View All, View One, Edit, Delete

const User = require('../models/user.model')

//READ
const viewAllUsers = async (req, res) => {
    const users = await User.find()
    if(!users) { return res.status(204).json({'message' : 'No Users found' }) }
    // On success set res(result) to all users
    res.json(users)
}

const viewOneUser = async (req, res) => {
    if(!req?.params?.id) { return res.status(400).json({'message' : 'PARAM: User id required'}) }

    const user = await User.findOne({_id: req.params.id}).exec()
    if(!user) { return res.status(204).json({ 'message' : `User with ID: ${req.params.id} not found` }) }
    //On successfully locating User with ID provided in params set res(result) to user
    res.json(user)
}

//UPDATE
const updateUser = async (req, res) => {
    if(!req?.body?.id) { return res.status(400).json({ 'message' : 'PARAM: User ID required' }) }

    const user = await User.findOne({_id: req.body.id}).exec()
    if(!user) { return res.status(204).json('message' : `No User found with ID ${req.body.id}`) }

    if(req?.body?.firstname) { user.name.first = req.body.firstname }
    if(req?.body?.lastname) { user.name.last = req.body.lastname }
    if(req?.body?.email) { user.email = req.body.email }
    if(req?.body?.password) { user.password = req.body.password }

    const result = await user.save() //saves changes made to user
    res.json(result)
}

//DELETE
const deleteUser = 


module.exports = {viewAllUsers, viewOneUser, updateUser, deleteUser}