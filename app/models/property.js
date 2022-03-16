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
        required: false
    }, 
    state: {
        type: String, 
        required: false
    }, 
    zip: {
        type: String, 
        required: false
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
        required: false
    }, 
    description: {
        type: String
    },
    tasks: [{
        taskTitle: {
            type: String, 
            required: false
        }, 
        taskDescription: {
            type: String, 
            required: false
        }, 
        complete: {
          type: Boolean, 
          required: false
        }
    }], 
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Landlord', 
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Property', PropertySchema)