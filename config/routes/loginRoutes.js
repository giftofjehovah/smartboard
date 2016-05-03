const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const dashboardController = require('../../controllers/twitterController')

router.route('/login')
  .post(usersController.login)

router.route('/signup')
  .post(usersController.signup)

router.route('/test')
  .get(dashboardController.getWeather)

module.exports = router
