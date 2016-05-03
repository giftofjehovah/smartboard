import React from 'react'

class Tweets extends React.Component {
  render () {
    var styles = {
      height: '93vh',
      border: 'solid 1px darkgrey'
    }

    var buttonStyles = {
      'top': '200px'
    }

    var cardBodyStyles = {
      height: '100%'
    }

    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Tweets</h4>
        </div>
        <div className='card-body' style={cardBodyStyles}>
          <button className='btn btn-primary btn-lg centered' style={buttonStyles}><i className='fa fa-twitter-square'></i> Login with Twitter</button>
        </div>
      </div>
    )
  }
}

export default Tweets
