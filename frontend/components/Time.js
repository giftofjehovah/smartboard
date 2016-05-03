import React from 'react'
import moment from 'moment'

class Time extends React.Component {

  constructor () {
    super()
    this.state = {
      time: ''
    }
  }

  componentWillMount () {
    var _this = this
    window.setInterval(function () {
      _this.setState({
        time: moment().format('HH:mm:ss')
      })
    }, 1000)
  }

  render () {
    var styles = {
      height: '45vh',
      border: 'solid 1px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Time</h4>
          <h5>{moment().format('dddd, MMMM Do YYYY')}</h5>
          <h2>{this.state.time}</h2>
        </div>
      </div>
    )
  }
}

export default Time
