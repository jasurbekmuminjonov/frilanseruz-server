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
    address: {
        type: {
            country: String,
            region: String,
            district: String
        },
        default: {}

    },
    job_type: {
        type: String,
        enum: ['development', 'design', 'testing', 'content', 'marketing', ''],
        default: ""
    },
    job: {
        type: String,
        default: ""
    },
    experience: {
        type: {
            year: Number,
            level: String
        },
        default: {}
    },
    profile_photo: {
        type: Buffer,
        default: 'default'
    },
    portfolio: {
        type: [{
            title: String,
            description: String,
            link: String,
            image: Buffer,
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
        unique: true,
        lowercase: true,
        match: /^[a-z0-9_]+$/,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema);