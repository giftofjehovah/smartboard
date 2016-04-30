const Twitter = require('twitter')
var client

function twitter (req, res, done, token, tokenSecret) {
  client = new Twitter({
    consumer_key: process.env.TWITTER_APP_KEY,
    consumer_secret: process.env.TWITTER_APP_CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  })

  client.get('statuses/user_timeline', {count: 1}, function (err, tweets, response) {
    if (err) return done(err)
    res.json(tweets)
  })
}

function twitterStream (io) {
  io.on('connect', function (socket) {
    client.stream('statuses/filter', {track: 'STcom'}, function (stream) {
      stream.on('data', function (tweet) {
        console.log(tweet.text)
        socket.emit('tweets', tweet.text)
      })
    })
  })
}

module.exports = {
  twitter: twitter,
  twitterStream: twitterStream
}
