const User = require('../models/user')
const Twitter = require('../models/twitter')
const twitterController = require('./twitterController')

function saveTwitterInfo (req, res, done) {
  console.log(req.user.isNew.email)
  console.log(req.body.twitterId)
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

module.exports = {
  saveTwitterInfo: saveTwitterInfo
}
