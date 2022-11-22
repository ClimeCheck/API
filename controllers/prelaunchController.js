const Waitlist = require('../models/waitlist');
const Contributor = require('../models/contributor');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


// Join wait list =>   /api/v1/waitlist
exports.joinlist = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    const user = await Waitlist.findOne({ email: email });


    if (user) {
        return next(new ErrorHandler('You are already on the list', 400));
    }

    const join = await Waitlist.create({ email });

    if (!join) {
        return next(new ErrorHandler('Please enter your email address', 400));
    }

    res.status(200).json({
        success: true,
        message: "you have been added to the waitlist"
    })
});

// Get users on waitlist  =>   /api/v1/allusers
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await Waitlist.find();

    res.status(200).json({
        success: true,
        users
    })
});

// Join contributors  =>  /api/v1/contributors
exports.addContributor = catchAsyncErrors(async (req, res, next) => {
    const { name, email, bio, contributionType, linkedIn, twitter, additionalDetails } = req.body;

    const existingUser = await Contributor.findOne({ email: email })

    if (existingUser) {
        return next(new ErrorHandler('user already on contributor list'), 400)
    }
    // Checks if required fields are filled is entered by user
    if (!email || !name || !bio || !contributionType || !twitter) {
        return next(new ErrorHandler('please fill all important fields'), 400)
    }


    // adding contributor to database
    const user = await Contributor.create({
        name,
        email,
        bio,
        contributionType,
        linkedIn,
        twitter,
        additionalDetails
    });

    if (!user) {
        return next(new ErrorHandler('user not added'), 400)
    }

    res.status(200).json({

        success: true,
        message: "you have been added to the contributors list"
    })



});

// Get all contributors  =>  /api/v1/contributors
exports.getContributors = catchAsyncErrors(async (req, res, next) => {
    const contributors = await Contributor.find();

    res.status(200).json({
        success: true,
        contributors
    })
});