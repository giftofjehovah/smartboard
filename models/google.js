const mongoose = require('mongoose')

const googleSchema = mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  accessToken: String,
  refreshToken: String,
  picture: String
})

module.exports = mongoose.model('Google', googleSchema)
module.exports.schema = googleSchema
