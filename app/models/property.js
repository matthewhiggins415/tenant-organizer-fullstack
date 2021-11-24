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
    numOfUnits: {
        type: Number, 
        required: true
    }, 
    totalRent: {
        type: Number, 
        required: true
    }, 
    DayRentDue: {
        type: Number, 
        required: true
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