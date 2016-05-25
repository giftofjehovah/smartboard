const Twitter = require('twitter')
var client

function twitter (req, res, done, token, tokenSecret) {
  console.log(process.env.TWITTER_APP_KEY)
  console.log(process.env.TWITTER_APP_CONSUMER_SECRET)
  console.log(token)
  console.log(tokenSecret)
  client = new Twitter({
    consumer_key: process.env.TWITTER_APP_KEY,
    consumer_secret: process.env.TWITTER_APP_CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  })

  client.get('statuses/home_timeline', {count: 10}, function (err, tweets, response) {
    if (err) done(err)
    res.json(tweets)
  })
}

function twitterStream (socket) {
  socket.on('start', function () {
    client.stream('user', function (stream) {
      stream.on('data', function (tweet) {
        socket.emit('tweets', tweet)
      })
    })
  })
}

module.exports = {
  twitter: twitter,
  twitterStream: twitterStream
}
