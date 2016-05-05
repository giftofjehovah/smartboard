import startOauth from 'spa-oauth'
import request from 'request'
import h from './helpers'

class Google {
  login (cb) {
    startOauth('google', h.setUrl() + '/auth/google', 'google', function (params) {
      if (params.id !== 'undefined') {
        window.localStorage.setItem('google', params.id)
      }
      cb()
    })
  }

  getCalender (cb) {
    request.post(h.setUrl() + '/dashboard/google', function (err, res, body) {
      if (err) throw err
      cb(JSON.parse(body))
    }).form({googleId: window.localStorage.getItem('google')}).auth(null, null, true, window.localStorage.getItem('token'))
  }
}

export default Google
