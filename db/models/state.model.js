const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state_code: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    country_id: {
        type: Number,
        required: true
    },
    cities: [{
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    }]
},
    { collection: 'states' }, { timestamps: true }
)

const states = mongoose.model('states', StateSchema);

module.exports = { states };