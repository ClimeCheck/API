const mongoose = require('mongoose');
const validator = require('validator');

const waitlistSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Waitlist', waitlistSchema);