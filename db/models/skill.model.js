const mongoose = require('mongoose');

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
    }
})

const MainSkill = mongoose.model('MainSkill', MainSkillModel);
const SubSkill = mongoose.model('SubSkill', SubSkillModel);
const Skill = mongoose.model('Skill', SkillModel);

module.exports = { MainSkill, SubSkill, Skill }