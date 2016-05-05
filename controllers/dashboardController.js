const User = require('../models/user')
const Twitter = require('../models/twitter')
const twitterController = require('./twitterController')
const Forecast = require('forecast.io')
const io = require('../app')

function saveTwitterInfo (req, res, done) {
  User.findOne({email: req.user._doc.email}, function (err, user) {
    if (err) return done(err)
    Twitter.findOne({id: req.body.twitterId}, function (err, twitter) {
      if (err) return done(err)
      user.twitter = twitter
      user.save(function (err, user) {
        if (err) return done(err)
        twitterController.twitter(req, res, done, user.twitter[0].token, user.twitter[0].tokenSecret)
        io
      })
    })
  })
}

function getWeather (req, res, done) {
  var options = {
    APIKey: process.env.FORECAST_KEY
  }
  var forecast = new Forecast(options)

  forecast.get(req.body.latitude, req.body.longitude, function (err, response, data) {
    if (err) throw err
    res.json(data)
    console.log(data)
  })
}

module.exports = {
  saveTwitterInfo: saveTwitterInfo,
  getWeather: getWeather
}
