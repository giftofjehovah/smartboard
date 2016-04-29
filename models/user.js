const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: String,
  password: String
})

userSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.getSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
