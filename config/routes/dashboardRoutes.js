const express = require('express')
const router = express.Router()
const dashboardController = require('../../controllers/dashboardController')

router.route('/twitter')
  .post(dashboardController.saveTwitterInfo)

router.route('/weather')
  .post(dashboardController.getWeather)

module.exports = router
