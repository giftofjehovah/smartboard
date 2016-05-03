const cronofy = require('cronofy')

var options = {
  client_id: process.env.CRONOFY_CLIENT_ID,
  client_secret: process.env.CRONOFY_SECRET_ID,
  grant_type: 'authorization_code',
  code: 'ahaaagagaha',
  redirect_uri: 'http://localhost:3000/auth/cronofy/callback'
}

cronofy.requestAccessToken(options)
  .then(function (res) {
    console.log(res)
  })
