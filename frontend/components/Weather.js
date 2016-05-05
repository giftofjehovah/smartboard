import React from 'react'
import WeatherForecast from '../models/Weather'

class Weather extends React.Component {
  constructor () {
    super()
    this.state = {
      icons: '',
      summary: '',
      timezone: '',
      nextDay: ''
    }
  }

  componentDidMount () {
    var _this = this
    var weatherForecast = new WeatherForecast()
    weatherForecast.getWeather(function (data) {
      console.log(data)
      _this.setState({
        icon: data.daily.data[0].icon,
        temperature: data.currently.temperature,
        summary: data.daily.data[0].summary,
        nextDay: data.daily.data[1].summary
      })
    })
  }

  render () {
    var styles = {
      height: '45vh',
      border: 'solid 1px darkgrey'
    }

    var columnStyle = {
      'padding-left': '15px',
      'padding-right': '15px'
    }

    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'><small className='card-meta'><i className='fa fa-sun-o fa-1x'></i> Weather</small></h4>
          <h6><span className='label label-primary'>{this.state.icon}</span></h6>
          <h2> {this.state.temperature} </h2>
          <h6> {this.state.summary} </h6>
        </div>
        <div className='card-body'>
          <div className='card' style={columnStyle} >
            <div className='columns'>
              <div className='column col-12'>
                <h6><small className='card-meta'>Tomorrow</small></h6>
                <h6>{this.state.nextDay}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather
