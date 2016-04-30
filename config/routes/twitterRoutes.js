const express = require('express')
const router = express.Router()
const twitterController = require('../../controllers/twitterController')

router.route('/')
  .get(twitterController.twitter)

module.exports = router
