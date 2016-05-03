import React from 'react'
import Tweets from './Tweets'
import Time from './Time'
import Weather from './Weather'
import News from './News'
import Calendar from './Calendar'
import Quotes from './Quotes'

class Dashboard extends React.Component {
  render () {
    return (
  <div className='container'>
    <div className='columns'>
      <div className='column col-3'>
        <div className='columns'>
          <div className='column col-12'>
            <Tweets/>
          </div>
        </div>
      </div>
      <div className='column col-6'>
        <div className='columns'>
          <div className='column col-6'>
            <Time/>
          </div>
          <div className='column col-6'>
            <Weather/>
          </div>
        </div>
        <div className='columns'>
          <div className='column col-6'>
            <Calendar/>
          </div>
          <div className='column col-6'>
            <Quotes/>
          </div>
        </div>
      </div>
      <div className='column col-3'>
        <div className='columns'>
          <div className='column col-12'>
            <News/>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default Dashboard
