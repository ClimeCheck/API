const mongoose = require('mongoose');
const validator = require('validator');



const contributorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        validate: [validator.isAlpha, 'Please enter valid name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    bio: {
        type: String,
        required: [true, 'Please enter your bio']

    },
    contributionType: {
        type: String,
        required: [true, 'Please enter your contribution type'],
        enum: {
            values: ['Community', 'Governance', 'Software', 'Artificial Intelligence', 'Hardware', 'Infrastructure', 'Other'],
            message: 'Please select correct area of contribution'
        },
        default: 'Community'
    },
    linkedIn: {
        type: String,
        validate: {
            validator: value => validator.isURL(value, { protocols: ['https'], require_tld: true, require_protocol: true }),
            message: 'Must be a LinkedIn URL'
        }
    },
    twitter: {
        type: String,
        required: [true, 'Please enter the link to your twitter handle'],
        validate: {
            validator: value => validator.isURL(value, { protocols: ['https'], require_tld: true, require_protocol: true }),
            message: 'Must be a Twitter URL'
        }
    },
    additionalDetails: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.model('Contributor', contributorSchema);