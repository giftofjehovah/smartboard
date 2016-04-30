require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')
const twitterController = require('./controllers/twitterController')
const localPassport = require('./config/passport')
const loginRoutes = require('./config/routes/loginRoutes')
const socialRoutes = require('./config/routes/socialRoutes')
const twitterRoutes = require('./config/routes/twitterRoutes')

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/smartboard'

const app = express()
const server = require('http').createServer(app)

const io = require('socket.io')(server)

mongoose.connect(mongoUri)
server.listen(port)

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
twitterController.twitterStream(io)
app.set('views', './public')
app.set('view engine', 'ejs')
app.use('/', function (req, res) {
  res.render('index')
})
app.use(logger('dev'))
app.use(bodyParser())

app.use(passport.initialize())
localPassport(passport)

app.use('/', loginRoutes)
app.use('/auth', socialRoutes)
app.use('/twitter', twitterRoutes)
