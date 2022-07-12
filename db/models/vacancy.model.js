const mongoose = require('mongoose');

const VacancySchema = mongoose.Schema({
    
    name:{
        type: String,
        required: [true, "Name Required For the Vacancy"]
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Skill Id Required"]
    }
    ,
    subSkillId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Sub category Required!"]
    },
    mainSkillId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Main Category Required!"]
    }
});

const VacancyModel = mongoose.model('VacancyTable', VacancySchema);

module.exports = { VacancyModel }