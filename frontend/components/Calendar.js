import React from 'react'
import Google from '../models/Google'
import moment from 'moment'

class Calendar extends React.Component {

  constructor () {
    super()
    this.state = {
      events: [],
      button: ''
    }
  }

  componentWillMount () {
    var buttonStyles = {
      top: '200px'
    }

    var googleButton = (<button onClick={this.firstLogin.bind(this)} className='btn btn-primary btn-lg centered' style={buttonStyles}><i className='fa fa-twitter-square'></i> Login with Google </button>)
    if (window.localStorage.getItem('google') && window.localStorage.getItem('google') !== 'undefined') {
      googleButton = ''
      this.getCalendar()
    }
    this.setState({
      button: googleButton
    })
  }

  firstLogin () {
    var _this = this
    var google = new Google()
    google.login(function () {
      _this.getCalendar()
      _this.setState({button: ''})
    })
  }

  getCalendar () {
    var _this = this
    var google = new Google()
    google.getCalender(function (list) {
      var reversedArray = list.items.reverse()
      var lowFatArray = reversedArray.slice(0, 9)
      var newCalendar = lowFatArray.map(_this.transformCalendar)
      _this.setState({
        button: '',
        events: newCalendar
      })
    })
  }

  transformCalendar (event) {
    return (
      <div key={event.id} className='card'>
        <div className='columns'>
          <div className='column col-12'>
            <h6>Dates: {moment(event.end.dateTime).format('Do MMM HH:mm')}</h6>
            <h6>Summary: {event.summary}</h6>
            <h6>Location: {event.location}</h6>
          </div>
        </div>
      </div>
    )
  }

  render () {
    var styles = {
      height: '45vh',
      border: 'solid 2px darkgrey',
      overflow: 'scroll'
    }

    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'><small className='card-meta'><i className='fa fa-calendar-check-o fa-2x'></i> Calendar</small></h4>
          {this.state.button}
        </div>
        <div className='card-body'>
          {this.state.events}
        </div>
      </div>
    )
  }
}

export default Calendar
