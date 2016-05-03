import React from 'react'
import Skycons from 'skycons'
// var ReactSkycons = require('react-skycons')

class Weather extends React.Component {
  render () {
    var styles = {
      height: '45vh',
      border: 'solid 1px darkgrey'
    }

    var skycons = new Skycons({
      color: 'black'
    })
    console.log(skycons)

    skycons.prototype.add(document.getElementById('icon'), Skycons.RAIN)

    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Weather</h4>
        </div>
        <div className='card-body'>
          <canvas id='icon' />
        </div>
      </div>
    )
  }
}

export default Weather
