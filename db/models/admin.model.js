const mongoose = require('mongoose');

const AdminModel = mongoose.Schema({
    
    email: {
        type: String,
        required: true
    }, 
    mobileNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
},{timestamps:true});

const Admin = mongoose.model('Admin', AdminModel);

module.exports = { Admin }