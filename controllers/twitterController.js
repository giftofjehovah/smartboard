const Twitter = require('twitter')
var request = require('request')
var client

function twitter (req, res, done, token, tokenSecret) {
  client = new Twitter({
    consumer_key: process.env.TWITTER_APP_KEY,
    consumer_secret: process.env.TWITTER_APP_CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  })

  client.get('statuses/home_timeline', {count: 10}, function (err, tweets, response) {
    if (err) return done(err)
    res.json(tweets)
  })
}

function twitterStream (io) {
  io.on('connect', function (socket) {
    socket.on('start', function () {
      client.stream('user', function (stream) {
        stream.on('data', function (tweet) {
          socket.emit('tweets', tweet)
        })
      })
    })
  })
}

function getWeather (req, res, done) {
  request.get('http://api.forecast.io/forecast/d0ac5297efaba8ec4537320cad46383e/1.2787986999999998,103.84134859999999', function (err, resp, body) {
    console.log(err)
    res.json(body)
  })
}

module.exports = {
  twitter: twitter,
  twitterStream: twitterStream,
  getWeather: getWeather
}
