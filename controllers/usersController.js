// const User = require('../models/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')

function login (req, res, done) {
  return passport.authenticate('local-signin', function (err, user, info) {
    if (err) return done(err)
    if (!user) return res.status(200).json(info)
    const token = jwt.sign(user, process.env.JWTSECRET)
    res.status(202).json({token: token, user: user.twitter.id})
  })(req, res)
}

function signup (req, res, done) {
  return passport.authenticate('local-signup', function (err, user, info) {
    if (err) return done(err)
    if (!user) return res.status(200).json(info)
    const token = jwt.sign(user, process.env.JWTSECRET)
    return res.status(201).json({token: token, user: user.twitter.id})
  })(req, res)
}

module.exports = {
  login: login,
  signup: signup
}
