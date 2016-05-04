const User = require('../models/user')
const Twitter = require('../models/twitter')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

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
  callbackURL: process.env.WEBURL + '/auth/facebook/callback',
  enableProof: true,
  profileFields: ['name', 'emails']
}, function (access_token, refresh_token, profile, done) {
  User.findOne({email: profile.emails[0].value}, function (err, user) {
    if (err) return done(err)
    if (user) return done(null, user)
    var newUser = new User()
    newUser.email = profile.emails[0].value
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
  callbackURL: process.env.WEBURL + '/auth/twitter/callback'
}, function (token, token_secret, profile, done) {
  console.log(profile)
  Twitter.findOne({id: profile.id}, function (err, twitter) {
    if (err) return done(err)
    if (twitter) return done(null, twitter, {message: 'User found!'})
    var newTwitter = new Twitter()
    newTwitter.id = profile.id
    newTwitter.name = profile.displayName
    newTwitter.username = profile.username
    newTwitter.token = token
    newTwitter.tokenSecret = token_secret
    newTwitter.save(function (err, twitter) {
      if (err) return done(err)
      return done(null, twitter, {message: 'twitter profile saved'})
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
