const User = require('../models/user.js')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

const localSignUp = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  console.log(req.body)
  User.findOne({'email': email}, function (err, user) {
    if (err) return done(err)
    if (user) {
      return done(null, false, {message: 'This email is already used!'})
    } else {
      var newUser = new User()
      newUser.fb.firstName = req.body.firstName
      newUser.fb.lastName = req.body.lastName
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

const facebook = new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  enableProof: true,
  profileFields: ['name', 'emails']
}, function (access_token, refresh_token, profile, done) {
  User.findOne({email: profile.emails[0].value}, function (err, user) {
    if (err) return done(err)
    if (user) return done(null, user)
    var newUser = new User()
    newUser.fb.id = profile.id
    newUser.fb.accessToken = access_token
    newUser.fb.firstName = profile.name.givenName
    newUser.fb.lastName = profile.name.familyName
    newUser.save(function (err, user) {
      if (err) return done(err)
      return done(null, user, {message: 'User created!'})
    })
  })
})

const twitter = new TwitterStrategy({
  consumerKey: process.env.TWITTER_APP_KEY,
  consumerSecret: process.env.TWITTER_APP_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
}, function (token, token_secret, profile, done) {
  User.findOne({email: 'leok'}, function (err, user) {
    if (err) return done(err)
    if (!user) return done(null, false, {message: 'Cant find your profile, please try to login again'})
    user.twitter.id = profile.id
    user.twitter.name = profile.displayName
    user.twitter.username = profile.username
    user.twitter.token = token
    user.twitter.tokenSecret = token_secret
    user.save(function (err, user) {
      if (err) return done(err)
      return done(null, user, {message: 'twitter profile saved'})
    })
  })
})

function passport (passport) {
  passport.use('local-signup', localSignUp)
  passport.use('local-signin', localSignIn)
  passport.use('facebook', facebook)
  passport.use('twitter', twitter)
}

module.exports = passport
