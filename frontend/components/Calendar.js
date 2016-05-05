import React from 'react'
import Google from '../models/Google'

class Calendar extends React.Component {

  firstLogin () {
    var google = new Google()
    google.login(function () {
      google.getCalander(function (list) {
        console.log(list)
      })
    })
  }

  render () {
    var buttonStyles = {
      top: '200px'
    }
    var styles = {
      height: '45vh',
      border: 'solid 1px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Calendar</h4>
          <button onClick={this.firstLogin.bind(this)} className='btn btn-primary btn-lg centered' style={buttonStyles}><i className='fa fa-twitter-square'></i> Login with Google</button>
        </div>
      </div>
    )
  }
}

export default Calendar
