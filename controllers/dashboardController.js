const User = require('../models/user')
const Twitter = require('../models/twitter')
const Google = require('../models/google')
const twitterController = require('./twitterController')
const Forecast = require('forecast.io')
const gcal = require('google-calendar')

function saveTwitterInfo (req, res, done) {
  User.findOne({email: req.user._doc.email}, function (err, user) {
    if (err) return done(err)
    Twitter.findOne({id: req.body.twitterId}, function (err, twitter) {
      if (err) return done(err)
      user.twitter = twitter
      user.save(function (err, user) {
        if (err) return done(err)
        twitterController.twitter(req, res, done, user.twitter[0].token, user.twitter[0].tokenSecret)
      })
    })
  })
}

function getWeather (req, res, done) {
  var key = {
    APIKey: process.env.FORECAST_KEY
  }
  var options = {
    units: 'auto'
  }
  var forecast = new Forecast(key)

  forecast.get(req.body.latitude, req.body.longitude, options, function (err, response, data) {
    if (err) throw err
    res.json(data)
  })
}

function saveGoogleInfo (req, res, done) {
  User.findOne({'email': req.user._doc.email}, function (err, user) {
    if (err) return done(err)
    Google.findOne({id: req.body.googleId}, function (err, google) {
      if (err) return done(err)
      user.google = google
      user.save(function (err, user) {
        if (err) return done(err)
        getCalendar(user, res, done)
      })
    })
  })
}

function getCalendar (user, res, done) {
  var calendar = new gcal.GoogleCalendar(user.google[0].accessToken)
  calendar.events.list('primary', function (err, events) {
    console.log(err)
    if (err) return done(err)
    res.json(events)
  })
}

module.exports = {
  saveTwitterInfo: saveTwitterInfo,
  saveGoogleInfo: saveGoogleInfo,
  getWeather: getWeather
}
