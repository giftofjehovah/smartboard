const express = require('express')
const router = express.Router()
const socialController = require('../../controllers/socialController')
const dashboardController = require('../../controllers/dashboardController')

router.route('/facebook')
  .get(socialController.facebookLogin)

router.route('/facebook/callback')
  .get(socialController.facebookCallback)

router.route('/twitter')
  .get(socialController.twitterLogin)

router.route('/twitter/callback')
  .get(socialController.twitterCallback)

router.route('/dashboard')
  .post(dashboardController.saveTwitterInfo)

module.exports = router
