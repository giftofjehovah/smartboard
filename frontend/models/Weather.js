import geolocation from 'geolocation'
import h from './helpers'
import request from 'request'

class Weather {
  getWeather (cb) {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err
      request.post(h.setUrl() + '/dashboard/weather', function (err, res, body) {
        if (err) throw err
        cb(JSON.parse(body))
      }).form({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude}).auth(null, null, true, window.localStorage.getItem('token'))
    })
  }
}

export default Weather
