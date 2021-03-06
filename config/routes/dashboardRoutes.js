const express = require('express')
const router = express.Router()
const dashboardController = require('../../controllers/dashboardController')

router.route('/twitter')
  .post(dashboardController.saveTwitterInfo)

router.route('/weather')
  .post(dashboardController.getWeather)

router.route('/google')
  .post(dashboardController.saveGoogleInfo)

router.route('/quote')
  .get(dashboardController.getQuote)

// router.route('/calendar')
//   .post(dashboardController.getCalendar)

module.exports = router
