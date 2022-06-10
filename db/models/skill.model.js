const mongoose = require('mongoose');

const SectorModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const CategoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sectorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sector'
    }
});

const fieldModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Sector = mongoose.model('Sector', SectorModel);
const Category = mongoose.model('Category', CategoryModel);
const Field = mongoose.model('Field', fieldModel);

// const Skill = mongoose.model('Skills', SkillModel);

// module.exports = { Skill }