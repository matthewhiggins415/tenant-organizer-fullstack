const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TenantSchema = require('./tenant')
const PropertySchema = require('./property')

const LandlordSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  tenants: [TenantSchema],
  properties: [PropertySchema],
  token: String
}, {
  timestamps: true,
  toJSON: {
    // remove `hashedPassword` field when we call `.toJSON`
    transform: (_doc, landlord) => {
      delete landlord.hashedPassword
      return landlord
    }
  }
})

module.exports = mongoose.model('Landlord', LandlordSchema)
