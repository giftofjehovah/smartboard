const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const twitterSchema = require('./twitter').schema
const googleSchema = require('./google').schema

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  fb: {
    id: String,
    firstName: String,
    lastName: String,
    accessToken: String,
    refreshToken: String
  },
  clef: {
    id: String
  },
  twitter: [twitterSchema],
  google: [googleSchema]
})

userSchema.statics.encrypt = function (password) {
  console.log(bcrypt)
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
