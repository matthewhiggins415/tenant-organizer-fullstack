const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    status: {
        type: String,
    }, 
    address: {
        type: String, 
        required: true, 
        unique: true
    }, 
    numOfUnits: {
        type: Number, 
        required: true
    }, 
    totalRent: {
        type: Number, 
        required: true
    }, 
    DayofMonthRentDue: {
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

module.exports = PropertySchema