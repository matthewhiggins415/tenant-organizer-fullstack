const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    status: {
        type: String,
    }, 
    address: {
        type: String,
        required: true 
    }, 
    city: {
        type: String, 
        required: true
    }, 
    state: {
        type: String, 
        required: true
    }, 
    zip: {
        type: String, 
        required: true
    },
    numOfUnits: {
        type: Number, 
        required: true
    }, 
    totalRent: {
        type: Number, 
        required: true
    }, 
    dayRentDue: {
        type: Number, 
        required: true
    }, 
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Landlord', 
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Property', PropertySchema)