import geolocation from 'geolocation'
import Forecast from 'forecast.io'

class Weather {
  constructor () {
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      var options = {
        APIKey: 'd0ac5297efaba8ec4537320cad46383e'
      }
      var forecast = new Forecast(options)

      forecast.get(position.coords.latitude, position.coords.longitude, function (err, res, data) {
        if (err) throw err
        console.log(data)
      })
    })
  }
}

export default Weather
