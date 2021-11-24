const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  properties: [{
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }],
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
