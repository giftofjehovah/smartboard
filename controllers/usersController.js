// const User = require('../models/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')

function login (req, res, done) {
  return passport.authenticate('local-signin', function (err, user, info) {
    if (err) return done(err)
    if (!user) return res.json(info)
    const token = jwt.sign(user, process.env.JWTSECRET)
    res.json({token: token})
  })(req, res)
}

module.exports = {
  login: login
}
