const express = require('express')
const router = express.Router()
const socialController = require('../../controllers/socialController')

router.route('/facebook')
  .get(socialController.facebookLogin)

router.route('/facebook/callback')
  .get(socialController.facebookCallback)

router.route('/twitter')
  .get(socialController.twitterLogin)

router.route('/twitter/callback')
  .get(socialController.twitterCallback)

router.route('/cronofy')
  .get(socialController.cronofyLogin)

router.route('/cronofy/callback')
  .get(socialController.cronofyCallback)

module.exports = router
