const passport = require('passport')
const jwt = require('jsonwebtoken')

function facebookLogin (req, res) {
  return passport.authenticate('facebook', {scope: 'email'})(req, res)
}

function facebookCallback (req, res, done) {
  return passport.authenticate('facebook', function (err, user, info) {
    if (err) return done(err)
    const token = jwt.sign(user, process.env.JWTSECRET)
    if (user.twitter[0]) {
      res.redirect('/success?token=' + token + '&twitter=' + user.twitter[0].id)
    } else {
      res.redirect('/success?token=' + token)
    }
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
  return passport.authenticate('google', function (err, user, info) {
    if (err) return done(err)
    if (user) res.redirect('/success?id=' + user.google.id)
  })(req, res)
}

module.exports = {
  facebookLogin: facebookLogin,
  facebookCallback: facebookCallback,
  twitterLogin: twitterLogin,
  twitterCallback: twitterCallback,
  googleLogin: googleLogin,
  googleCallback: googleCallback
}
