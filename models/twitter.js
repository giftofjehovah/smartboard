const mongoose = require('mongoose')

const twitterSchema = mongoose.Schema({
  id: String,
  name: String,
  username: String,
  token: String,
  tokenSecret: String
})

module.exports = mongoose.model('Twitter', twitterSchema)
module.exports.schema = twitterSchema
