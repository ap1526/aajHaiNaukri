const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


// JWT SECRET TOKEN
const jwtSecret = "73594878348488929351davdapritam9825675398980296308";


const SignupSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name Is Required']
    },
    email: {
        type: String,
        required: [true, 'Email Is Required']
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile Number Is Required']
    },
    profileImage: {
        type: String,
        required: [true, 'Profile Image Is Required']
    },
    address: {
        type: String,
        required: [true, 'Address Is Required']
    },
    state: {
        type: String,
        required: [true, 'State Is Required']
    },
    city: {
        type: String,
        required: [true, 'City Is Required']
    },
    pincode: {
        type: String,
        required: [true, 'Pincode Is Required']
    },
    resumes: {
        type: String,
        required: false
    },
    typeOfJob: {
        type: String,
        required: [true, 'Type Of Job Is Required']
    },
    skill: {
        type: String,
        required: [true, 'Skill Is Required']
    },
    professionalExp: {
        type: String,
        required: [true, 'Professional Experience Is Required']
    },
    companyName: {
        type: String,
        required: false
    },
    companyState: {
        type: String,
        required: false
    },
    companyCity: {
        type: String,
        required: false
    },
    expTime: {
        type: String,
        required: false
    },
    pastSalary: {
        type: String,
        required: false
    },
    joinDate: {
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
    expectedSalary: {
        type: String,
        required: [true, 'Expected Salary Field Is Required']

    }
});


const signUp = mongoose.model('SignUP', SignupSchema);

module.exports = { signUp }