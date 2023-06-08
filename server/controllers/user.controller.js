const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

//READ
const viewAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    if(!users) { return res.status(500).json({'message' : 'No Users found' }) }
    // On success set res(result) to all users
    res.json(users)
})

const viewOneUser = asyncHandler(async (req, res) => {
    const {_id} = req.params.id
    if(!_id) { return res.status(400).json({'message' : 'PARAM: User id required'}) }

    const user = await User.findOne({_id}).exec()
    if(!user) { return res.status(204).json({ 'message' : `User with ID: ${_id} not found` }) }
    //On successfully locating User with ID provided in params set res(result) to user
    res.json(user)
})

//UPDATE
const updateUser = asyncHandler(async (req, res) => {
    const {_id, firstname, lastname, displayName, email, password, favorites, works, library, friends, messages} = req.body
    if(!_id) { return res.status(400).json({ 'message' : 'PARAM: User ID required' }) }

    const user = await User.findOne({_id}).exec()
    if(!user) { return res.status(204).json({'message' : `No User found with ID ${_id}`}) }

    if(firstname) { user.firstname = firstname }
    if(lastname) { user.lastname= lastname }
    if(displayName) { user.displayName = displayName }
    if(email) { user.email = email }
    if(password) { user.password = password }
    if(favorites) { user.favorites = favorites }
    if(works) { user.works = works }
    if(library) { user.library = library }
    if(friends) { user.friends = friends }
    if(messages) { user.messages = messages }

    const result = await user.save() //saves changes made to user
    res.json(result)
})

//DELETE
const deleteUser = asyncHandler(async (req, res) => {
    const {_id} = req.body
    if(!_id) { return res.status(400).json({ 'message' : 'PARAM: User ID required' }) }

    const user = await User.findOne({_id}).exec()
    if(!user) {return res.status(204).json({'message' : `No user found with ID: ${_id}`})
    }

    const result = await user.deleteOne({_id})
    res.json(result)
})


module.exports = {viewAllUsers, viewOneUser, updateUser, deleteUser}