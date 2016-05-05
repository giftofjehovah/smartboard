import startOauth from 'spa-oauth'
import request from 'request'
import h from './helpers'

class Twitter {
  login (cb) {
    startOauth('twitter', h.setUrl() + '/auth/twitter', 'twitter', function (params) {
      if (params.id !== 'undefined') {
        window.localStorage.setItem('twitter', params.id)
      }
      cb()
    })
  }

  getTweets (cb) {
    request.post(h.setUrl() + '/dashboard/twitter', function (err, res, body) {
      if (err) throw err
      cb(JSON.parse(body))
    }).form({twitterId: window.localStorage.getItem('twitter')}).auth(null, null, true, window.localStorage.getItem('token'))
  }
}

export default Twitter
