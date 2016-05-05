const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const clef = require('clef').initialize({
  appID: process.env.CLEF_ID,
  appSecret: process.env.CLEF_SECRET
})

function facebookLogin (req, res) {
  return passport.authenticate('facebook', {scope: 'email'})(req, res)
}

function facebookCallback (req, res, done) {
  return passport.authenticate('facebook', function (err, user, info) {
    if (err) return done(err)
    const token = jwt.sign(user, process.env.JWTSECRET)
    var url = '/success?token=' + token + '&name=' + user.fb.firstName
    if (user.twitter[0] !== null && typeof user.twitter[0] !== 'undefined') url = url + '&twitter=' + user.twitter[0].id
    if (user.google[0] !== null && typeof user.twitter[0] !== 'undefined') url = url + '&google=' + user.google[0].id
    res.redirect(url)
  })(req, res)
}

function twitterLogin (req, res, done) {
  return passport.authenticate('twitter', {scope: 'email'})(req, res, done)
}

function twitterCallback (req, res, done) {
  return passport.authenticate('twitter', function (err, twitter, info) {
    if (err) return done(err)
    if (twitter) res.redirect('/success?id=' + twitter.id)
  })(req, res)
}

function googleLogin (req, res, done) {
  return passport.authenticate('google')(req, res, done)
}

function googleCallback (req, res, done) {
  return passport.authenticate('google', function (err, google, info) {
    if (err) return done(err)
    if (google) res.redirect('/success?id=' + google.id)
  })(req, res)
}

function fitbitLogin (req, res, done) {
  return passport.authenticate('fitbit', { scope: ['activity', 'heartrate', 'location', 'profile'] })(req, res, done)
}

function fitbitCallback (req, res, done) {
  return passport.authenticate('fitbit', function (err, fitbit, info) {
    if (err) return done(err)
    if (fitbit) res.redirect('/success?id=' + fitbit.id)
  })(req, res)
}

function clefCallback (req, res, done) {
  clef.getLoginInformation({code: req.query.code}, function (err, data) {
    if (err) return done(err)
    User.findOne({email: data.email}, function (err, user) {
      if (err) return done(err)
      if (user) {
        const token = jwt.sign(user, process.env.JWTSECRET)
        var url = '/login?token=' + token + '&name=' + user.fb.firstName
        if (user.twitter[0] !== null && typeof user.twitter[0] !== 'undefined') url = url + '&twitter=' + user.twitter[0].id
        if (user.google[0] !== null && typeof user.twitter[0] !== 'undefined') url = url + '&google=' + user.google[0].id
        res.redirect(url)
      } else {
        var newUser = new User()
        newUser.email = data.email
        newUser.clef.id = data.id
        newUser.save(function (err, user) {
          if (err) return done(err)
          const token = jwt.sign(user, process.env.JWTSECRET)
          res.redirect('/login?token=' + token)
        })
      }
    })
  })
}

module.exports = {
  facebookLogin: facebookLogin,
  facebookCallback: facebookCallback,
  twitterLogin: twitterLogin,
  twitterCallback: twitterCallback,
  googleLogin: googleLogin,
  googleCallback: googleCallback,
  fitbitLogin: fitbitLogin,
  fitbitCallback: fitbitCallback,
  clefCallback: clefCallback
}
