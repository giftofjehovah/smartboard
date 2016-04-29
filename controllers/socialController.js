const passport = require('passport')
const jwt = require('jsonwebtoken')

function facebookLogin (req, res) {
  return passport.authenticate('facebook', {scope: 'email'})(req, res)
}

function facebookCallback (req, res, done) {
  return passport.authenticate('facebook', function (err, user, info) {
    if (err) return done(err)
    const token = jwt.sign(user, process.env.JWTSECRET)
    res.status(202).json({token: token})
  })(req, res)
}

module.exports = {
  facebookLogin: facebookLogin,
  facebookCallback: facebookCallback
}
