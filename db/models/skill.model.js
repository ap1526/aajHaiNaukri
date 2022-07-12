const mongoose = require('mongoose');
const { stringify } = require('querystring');

const MainSkillModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const SubSkillModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mainSkillId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MainSkill'
    }
});

const SkillModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
}, { timestamps: true })

const SkillDemo = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subSkills: [{
        type: String,
        required: true,
        skills: [{
            type: String,
            required: true
        }]
    }]
});

const MainSkill = mongoose.model('MainSkill', MainSkillModel);
const SubSkill = mongoose.model('SubSkill', SubSkillModel);
const Skill = mongoose.model('Skill', SkillModel);
const Skilldemo = mongoose.model('SkillDemo', SkillDemo);

module.exports = { MainSkill, SubSkill, Skill, Skilldemo }