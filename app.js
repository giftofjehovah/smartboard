const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')
const localPassport = require('./config/passport')
const loginRoutes = require('./config/routes/loginRoutes')

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/smartboard'

const app = express()

mongoose.connect(mongoUri)
app.listen(port)

if (app.get('env') === 'development') {
  require('dotenv').config()
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use(logger('dev'))
app.use(bodyParser())

app.use(passport.initialize())
localPassport(passport)

app.use('/', loginRoutes)
