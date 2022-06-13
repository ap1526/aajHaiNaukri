const { signUp } = require('./signup.model');
const { states } = require('./state.model');
const { company } = require('./company.model');
const { uploadResumes } = require('./submitResume.model');
const { onlycity } = require('./onlycity.model');
const { admin } = require('./admin.model');

module.exports = { signUp, states, company, uploadResumes, onlycity, admin }