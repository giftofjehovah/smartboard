require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const expressJWT = require('express-jwt')
const twitterController = require('./controllers/twitterController')
const localPassport = require('./config/passport')
const loginRoutes = require('./config/routes/loginRoutes')
const socialRoutes = require('./config/routes/socialRoutes')
const dashboardRoutes = require('./config/routes/dashboardRoutes')

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/smartboard'

const app = express()
const server = require('http').createServer(app)

mongoose.connect(mongoUri)
server.listen(port)
const io = require('socket.io')(server)
// if (app.get('env') === 'development') {
  // require('dotenv').config()
  app.use(function (err, req, res, next) {
    console.log('error: ', err.message)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
// }

app.use(logger('dev'))
app.use(bodyParser())
app.use('/dashboard', expressJWT({
  secret: process.env.JWTSECRET
}).unless({path: ['/dashboard']}))

app.use(session({secret: process.env.SESSIONSECRET}))
app.use(passport.initialize())
localPassport(passport)
app.use(express.static('./public'))
app.use('/auth', socialRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/', loginRoutes)
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
io.on('connect', (socket) => {
  twitterController.twitterStream(socket)
})
