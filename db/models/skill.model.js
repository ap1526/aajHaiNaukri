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
        required: true,
        ref:'Sector'
    }
});

const fieldModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    }
})

const Sector = mongoose.model('Sector', SectorModel);
const Category = mongoose.model('Category', CategoryModel);
const Field = mongoose.model('Field', fieldModel);

module.exports = { Sector, Category, Field }