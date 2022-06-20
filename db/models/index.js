const { signUp } = require('./signup.model');
const { states } = require('./state.model');
const { company } = require('./company.model');
const { uploadResumes } = require('./submitResume.model');
const { Admin } = require('./admin.model');

module.exports = { signUp, states, company, uploadResumes, Admin }