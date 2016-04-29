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
      return done(null, false, {message: 'This email is already used!'})
    } else {
      var newUser = new User()
      newUser.email = email
      newUser.password = User.encrypt(password)
      newUser.save(function (err, user) {
        if (err) return done(err)
        return done(null, user, {message: 'User created!'})
      })
    }
  })
})

const localSignIn = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  User.findOne({'email': email}, function (err, user) {
    if (err) return done(err)
    if (!user) return done(null, false, {message: 'Incorrect email'})
    if (!user.validPassword(password)) return done(null, false, {message: 'Incorrect password'})
    return done(null, user)
  })
})

function passport (passport) {
  passport.use('local-signup', localSignUp)
  passport.use('local-signin', localSignIn)
}

module.exports = passport
