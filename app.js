require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
// const twitterController = require('./controllers/twitterController')
const localPassport = require('./config/passport')
const loginRoutes = require('./config/routes/loginRoutes')
const socialRoutes = require('./config/routes/socialRoutes')

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/smartboard'

const app = express()
const server = require('http').createServer(app)

// const io = require('socket.io')(server)

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
// twitterController.twitterStream(io)
// app.use('/', function(req,res){
//   res.render('index')
// })
// app.set('views', './public')
// app.set('view engine', 'ejs')
app.use(session({secret: process.env.SESSIONSECRET}))
app.use(passport.initialize())
localPassport(passport)
app.use(express.static('./public'))
app.use('/auth', socialRoutes)
app.use('/', loginRoutes)
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
app.use(logger('dev'))
app.use(bodyParser())
