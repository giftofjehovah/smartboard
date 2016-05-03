import React from 'react'
import WeatherForecast from '../models/Weather'

class Weather extends React.Component {
  componentDidMount () {
      var weatherForecast = new WeatherForecast ()
  }

  render () {
    var styles = {
      height: '45vh',
      border: 'solid 1px darkgrey'
    }

    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Weather</h4>
        </div>
        <div className='card-body'>
        </div>
      </div>
    )
  }
}

export default Weather
