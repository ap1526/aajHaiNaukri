const mongoose = require('mongoose');

const HireSchema = mongoose.Schema({

    jobCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobTitle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vacancies: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    speaking: {
        type: String,
        required: true
    },
    Skill: {
        type: String,
        required: true
    },
    salaryFrom: {
        type: String,
        required: true
    },
    salaryTo: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contactPersonName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    jobTiming: {
        type: String,
        required: true
    },
    interviewTiming: {
        type: String,
        required: true
    }

});

const hireCandidate = mongoose.model('HireCandidate', HireSchema);

module.exports = { hireCandidate }