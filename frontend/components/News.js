import React from 'react'
import moment from 'moment'

class News extends React.Component {
  render () {
    var styles = {
      height: '93vh',
      border: 'solid 2px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'><small className='card-meta'><i className='fa fa-newspaper-o fa-2x'></i> Tech News</small></h4>
        </div>
        <div className='card-body'>
          <h6>{moment().format('Do MMM')}</h6>
          <h6>Giphy launches a keyboard for iOS</h6>
          <hr />
          <h6>{moment().format('Do MMM')}</h6>
          <h6>Uber Offers let merchants pay for your ride</h6>
          <hr />
          <h6>{moment().format('Do MMM')}</h6>
          <h6>Fintech doesn’t just disrupt banks, it makes them platforms </h6>
          <hr />
          <h6>{moment().format('Do MMM')}</h6>
          <h6>City carpooling service Via picks up $70M further funding, another $30M to come</h6>
          <hr />
          <h6>{moment().format('Do MMM')}</h6>
          <h6>Drawbridge raises $25M as it takes its cross-device tech beyond advertising</h6>
          <hr />
          <h6>{moment().format('Do MMM')}</h6>
          <h6>The most common marketing mistake startups make</h6>
          <hr />
        </div>
      </div>
    )
  }
}

export default News
