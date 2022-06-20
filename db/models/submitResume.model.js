const mongoose = require('mongoose');

const SubmitResumeSchema = new mongoose.Schema({

    profileImage: {
        type: String,
        require: false
    },
    name: {
        type: String,
        required: [true, "Please Provide Name"]
    },
    email: {
        type: String,
        required: [true, "Provide Your Email Address"]
    },
    dateOfBirth: {
        type: String,
        required: [true, "Provide Your BirthDate"]
    },
    mobileNo: {
        type: String,
        required: [true, "Provide Your Phone Number"]
    },
    address: {
        type: String,
        required: [true, "Provide Address"]
    },
    city: {
        type: String,
        required: [true, "Provide City"]
    },
    state: {
        type: String,
        required: [true, "Provide State"]
    },
    gender: {
        type: String,
        required: [true, "Please Specify Your Gender"]
    },
    description: {
        type: String,
        required: false
    },
    education: [{
        educationTitle: {
            type: String,
            required: [true, "Provide Education Title"]
        },
        grade: {
            type: String,
            required: [true, "Provide Degree"]
        },
        institute: {
            type: String,
            required: [true, "Mention Institute"]
        },
        educationYear: {
            type: String,
            required: [true, "Provide year Of Education"]
        }
    }],
    skill: {
        skillId: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Skill'
        }],
        subSkillId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'SubSkill'
        },
        mainSkillId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'MainSkill'
        }
    },
    socialLink: {
        linkedin: {
            type: String,
            required: false
        },
        facebook: {
            type: String,
            required: false
        },
        instagram: {
            type: String,
            required: false
        }
    }

}, { timestamps: true });


const uploadResumes = mongoose.model('uploadResumes', SubmitResumeSchema);

module.exports = { uploadResumes };