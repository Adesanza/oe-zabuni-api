const mongoose = require("mongoose");

const billboardSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['billboard'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    class: {
        type: String,
        enum: ['static','digital'],
        required: true
    },
    coordinate: {
        type: String,
        required: true
    },
    face: {
        type: String,
        required: true
    },
    height_m: {
        type: String,
        required: true
    },
    height_px: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        enum: ['southwest','southsouth','northcentral','southeast','northeast','northwest'],
        required: true
    },
    revenue: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: [
            'fct',
            'abia',
            'adamawa',
            'akwa ibom',
            'anambra',
            'bauchi',
            'bayelsa',
            'benue',
            'borno',
            'cross river',
            'delta',
            'ebonyi',
            'edo',
            'ekiti',
            'enugu',
            'gombe',
            'imo',
            'jigawa',
            'kaduna',
            'kano',
            'kastina',
            'kebbi',
            'kogi',
            'kwara',
            'lagos',
            'nassarawa',
            'niger',
            'ogun',
            'ondo',
            'osun',
            'oyo',
            'plateau',
            'rivers',
            'sokoto',
            'taraba',
            'yobe',
            'zamfara'
        ],
        required: true
    },
    status: {
        type: String,
        enum: ['active','inactive','vacant'],
        required: true
    },
    type: {
        type: String,
        enum: ['led','lightbox','bridge panel','eye catcher','mega board','portrait','rooftop','super48 sheet','ultrawave','unipole','video wall','wall drape'],
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    width_m: {
        type: String,
        required: true
    },
    width_px: {
        type: String,
        required: true
    }
})

const Billboard = mongoose.model('billboard',billboardSchema);

module.exports = Billboard;