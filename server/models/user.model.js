const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            first: {
                type: String,
                required: [true, 'First name is required.'],
                minlength: [3, 'Name(s) must be at least 3 characters.']
            },
            last: {
                type: String,
                minlength: [3, 'Name(s) must be at least 3 characters.']
            },
            display: {
                type: String,
                required: [true, 'Display name is required.' ],
                minlength: [5, 'Display Name must be at least 5 characters.'],
                maxlength: [20, 'Display Name must be no more than 20 characters.']
            }
        },
        email: {
            type: String,
            required: [true, 'Valid Email is required.']
        },
        password: {
            type: String,
            required: [true, 'Valid Password is required']
        },
        favorites: {
            poems: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Poem'
            }],
            stories: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story'
            }],
            novels: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Novel'
            }]
        },
        works: {
            poems: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Poem'
            }],
            stories: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story'
            }],
            novels: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Novel'
            }]
        },
        library: {
            poems: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Poem'
            }],
            stories: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story'
            }],
            novels: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Novel'
            }]
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }],
        
        refreshToken: String
    }
)

module.exports = mongoose.model('User', userSchema)