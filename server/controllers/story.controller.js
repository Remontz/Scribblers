const asyncHandler = require("express-async-handler");
const Story = require('../models/story.model');

//C
const createStory = asyncHandler(async (req, res) => {
    const { title, genre, stars, comments, author, content} = req.body
    if(!title || !genre || !stars || !comments || !author || !content) { return res.status(400).json({'message' : 'Invalid Story Data'}) }

    const duplicate = await Story.findOne({title, author}).exec()
    if(duplicate) { return res.status(409).json({'message' : `Story, ${title} by ${author} already exist.`}) }

    try {
        const result = await Story.create({
            "title": title,
            "genre": genre,
            "stars": stars,
            "comments": comments,
            "author": author,
            "content": content
        })

        res.status(201).json({ success: `New story: ${title} by ${author} created.` })
    } catch(err) { res.status(500).json({'message' : err.message }) }
})

//R
const getStories = asyncHandler(async (req, res) => {
    const stories = await Story.find()
    if(!stories) { return res.status(500).json({'message' : 'No stories found.'}) }

    res.status(201).json(stories)
})

const getStory = asyncHandler(async (req, res) => {
    const {_id} = req.params.id
    if(!_id) {return res.status(400).json({'message': 'Story ID required'})}

    const story = await Story.findOne({_id}).exec()
    if(!story) { return res.status(204).json({'message' : `No Story with ID ${_id} found`}) }

    res.json(story)
})

//U
const updateStory = asyncHandler(async (req, res) => {
    const {_id, title, genre, stars, comments, author, content} = req.body
    if(!_id) { return res.status(400).json({'message' : 'ID required to update'}) }

    const story = await Story.findOne({_id}).exec()
    if(!story) { return res.status(204).json({'message' : `No Story found with ID ${_id}`}) }

    if(title) { story.title = title }
    if(genre) { story.genre = genre }
    if(stars) { story.stars = stars }
    if(comments) { story.comments = comments }
    if(author) { story.author = author }
    if(content) { story.content = content }

    const result = await story.save()
    res.json(result)
})

//D
const deleteStory = asyncHandler(async (req, res) => {
    const {_id} = req.body
    if(!_id) { return res.status(400).json({'message' : 'ID required to delete'}) }

    const story = await Story.findOne({_id}).exec()
    if(!story) { return res.status(204).json({'message' : `No Story found with ID ${_id}`}) }

    const result = await story.deleteOne({_id})
    res.json(result)
})

module.exports = { createStory, getStories, getStory, updateStory, deleteStory }
