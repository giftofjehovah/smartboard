const passport = require('passport')
const jwt = require('jsonwebtoken')
const cronofy = require('cronofy')
const request = require('request')
const twitterController = require('./twitterController')

function facebookLogin (req, res) {
  return passport.authenticate('facebook', {scope: 'email'})(req, res)
}

function facebookCallback (req, res, done) {
  return passport.authenticate('facebook', function (err, user, info) {
    if (err) return done(err)
    const token = jwt.sign(user, process.env.JWTSECRET)
    // res.status(202).json({token: token})
    res.redirect('http://localhost:3000?jwt=' + token + '&hi=2')
  })(req, res)
}

function twitterLogin (req, res, done) {
  return passport.authenticate('twitter', {scope: 'email'})(req, res, done)
}

function twitterCallback (req, res, done) {
  return passport.authenticate('twitter', function (err, user, info) {
    if (err) return done(err)
    twitterController.twitter(req, res, done, user.twitter.token, user.twitter.tokenSecret)
  })(req, res)
}

function cronofyLogin (req, res, done) {
  var body = {
    'response_type': 'code',
    'client_id': process.env.CRONOFY_CLIENT_ID,
    'redirect_uri': 'http://localhost:3000',
    'scope': 'read_account list_calendars'
  }

  request({
    method: 'GET',
    uri: 'https://app.cronofy.com/oauth/authorize',
    body: JSON.stringify(body)
  }, function (err, res, body) {
    console.log(body)
  })

  // var options = {
  //   client_id: process.env.CRONOFY_CLIENT_ID,
  //   client_secret: process.env.CRONOFY_SECRET_ID,
  //   grant_type: 'authorization_code',
  //   code: 'ahaaagagaha',
  //   redirect_uri: 'http://localhost:3000/'
  // }
  //
  // cronofy.requestAccessToken(options, function (err, response) {
  //   if (err) console.log(err)
  //   // console.log(JSON.parse(response))
  // })
}

function cronofyCallback (req, res, done) {
  console.log('hi')
}

module.exports = {
  facebookLogin: facebookLogin,
  facebookCallback: facebookCallback,
  twitterLogin: twitterLogin,
  twitterCallback: twitterCallback,
  cronofyLogin: cronofyLogin,
  cronofyCallback: cronofyCallback
}
