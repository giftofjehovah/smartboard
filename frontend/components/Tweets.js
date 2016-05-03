import React from 'react'

class Tweets extends React.Component {
  render () {
    var styles = {
      height: '93vh',
      border: 'solid 1px darkgrey'
    }
    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Tweets</h4>
        </div>
      </div>
    )
  }
}

export default Tweets
