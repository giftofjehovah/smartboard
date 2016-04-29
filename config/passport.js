const User = require('../models/user.js')
const LocalStrategy = require('passport-local').Strategy

const localSignUp = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  User.findOne({'email': email}, function (err, user) {
    if (err) return done(err)
    if (user) {
      return done(null, false)
    } else {
      var newUser = new User()
      newUser.email = email
      newUser.local.password = User.encrypt(password)
      newUser.save(function (err, user) {
        if (err) return done(err)
        return done(null, user)
      })
    }
  })
})

function passport (passport) {
  passport.use('local-signup', localSignUp)
}

module.exports = passport
