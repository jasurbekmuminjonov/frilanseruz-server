const { spread } = require('axios');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        default: ""
    },
    job_type: {
        type: String,
        default: ""
    },
    job: {
        type: String,
        default: ""
    },
    experience_years: {
        type: Number,
        default: null
    },
    experience_level: {
        type: String,
        default: ""
    },
    profile_photo: {
        type: String,
        default: ''
    },
    portfolio: {
        type: [{
            title: String,
            description: String,
            link: String,
            image: String,
        }],
        default: []
    },
    skills: {
        type: Array,
        default: []
    },
    social_media: {
        type: [{
            platform: String,
            link: String,
        }],
        default: []
    },
    username: {
        type: String,
        match: /^[a-z0-9_]+$/,
        default: `user${Math.floor(100000 + Math.random() * 900000)}`
    },
    about: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema);