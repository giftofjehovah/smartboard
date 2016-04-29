const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const localPassport = require('./config/passport')
const loginRoutes = require('./config/routes/loginRoutes')

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/smartboard'

const app = express()

mongoose.connect(mongoUri)
app.listen(port)

app.use(logger('dev'))

app.use(passport.initialize())
localPassport(passport)

app.use('/', loginRoutes)
