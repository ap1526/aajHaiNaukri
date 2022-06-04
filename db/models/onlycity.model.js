const mongoose = require('mongoose');

const OnlyCitySchema = mongoose.Schema({
    
    id: {
        type: Number,
        required: true
    }, 
    name: {
        type: String,
        required: [true, "Name Is Required"]
    },
    state_id:{
        type: Number,
        required: true
    },
    state_code: {
        type: String,
        required: true
    },
    country_id:{
        type: Number, 
        required: true
    }, 
    country_name:{
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: false
    },
    wikiDataId:{
        type: String, 
        required: false 
    }
    
}, { collection: 'onlycity' });

const onlycity = mongoose.model('onlycity', OnlyCitySchema);

module.exports = { onlycity };