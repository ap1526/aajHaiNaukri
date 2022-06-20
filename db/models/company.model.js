const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({

    yearOfCompany: {
        type: String,
        required: [true, "Years Of Company Field Is Required"]
    },
    name: {
        type: String,
        required: [true, "Company Name Should be Provided"]
    },
    address: {
        type: String,
        required: [true, "Company Address Should Be Provided"]
    },
    state: {
        type: String,
        required: [true, "State Field Is Required"]
    },
    city: {
        type: String,
        required: [true, "City Field Is Required"]
    },
    pincode: {
        type: String,
        required: [true, "Pincode Is Neccessary"]
    },
    logo: {
        type: String,
        required: [true, "Company Logo Is Required"]
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile Number Is Required"]
    },
    email: {
        type: String,
        required: [true, "Company Email Is Mandatory"]
    },
    gst: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, "Role Field Is Required"]
    },
    roleDetails: {
        type: String,
        required: [true, "Role Details Must Be Provided"]
    },
    totalEmployee: {
        type: String,
        required: [true, "Mention Total Employees In Your Company"]
    },
    category: {
        type: String,
        required: [true, "Category Must Be Provided"]
    },
    bio: {
        type: String,
        required: [true, "Bio Of Company Is Required"]
    },
    website: {
        type: String,
        required: false
    },
    turnover: {
        type: String,
        required: false
    }

}, { timestamps: true })

const company = mongoose.model('Company', CompanySchema);

module.exports = { company }