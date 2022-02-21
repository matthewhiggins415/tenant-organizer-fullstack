const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LandlordSchema = new Schema({
  firstName: { 
    type: String
  }, 
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  stripeAccountCreated: {
    type: Boolean,
    default: false
  }, 
  stripeAccountActive: {
    type: Boolean, 
    default: false
  }, 
  stripeId: {
    type: String, 
    unique: true
  },
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
