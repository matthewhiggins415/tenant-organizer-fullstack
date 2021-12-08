const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TenantSchema = new Schema ({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    phone: {
        type: String, 
        required: true
    }, 
    tenantAddress: {
        type: String, 
        required: true
    }, 
    paymentInfo: {
        type: String 
    }, 
    status: {
        type: String
    }, 
    rentDate: {
        type: Date, 
        required: true
    }, 
    rentAmount: {
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

module.exports = mongoose.model('Tenant', TenantSchema)