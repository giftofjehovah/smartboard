import React from 'react'
import startOauth from 'spa-oauth'

class Tweets extends React.Component {
  twitterLogin () {
    startOauth('twitter', 'http://localhost:3000/auth/twitter', 'twitter', function (params) {
      if (params.id !== 'undefined') {
        window.localStorage.setItem('twitter', params.id)
      }
    })
  }

  render () {
    var styles = {
      height: '93vh',
      border: 'solid 1px darkgrey'
    }

    var buttonStyles = {
      top: '200px'
    }

    var cardBodyStyles = {
      height: '94.5%',
      overflow: 'scroll'
    }

    var tweetStyle = {
      marginTop: '5px'
    }

    return (
      <div className='card' style={styles}>
        <div className='card-header text-center'>
          <h4 className='card-title'>Tweets</h4>
        </div>
        <div className='card-body' style={cardBodyStyles}>
          <button onClick={this.twitterLogin.bind(this)} className='btn btn-primary btn-lg centered' style={buttonStyles}><i className='fa fa-twitter-square'></i> Login with Twitter</button>

          <div className='card' style={tweetStyle}>
            <div className='columns'>
              <div className='column col-2'>
                <figure className='avatar avatar-s'>
                  <img src='img/avatar-1.png' className='avatar-icon' />
                </figure>
              </div>
              <div className='column col-10'>
                <div className='card-header'>
                  <h3 className='card-title'>Microsoft</h3>
                </div>
                <div className='card-body'>
                  To make a contribution to the world by making tools for the mind that advance humankind.
                </div>
              </div>
            </div>
          </div>
          <div className='card' style={tweetStyle}>
            <div className='columns'>
              <div className='column col-2'>
                <figure className='avatar avatar-s'>
                  <img src='img/avatar-1.png' className='avatar-icon' />
                </figure>
              </div>
              <div className='column col-10'>
                <div className='card-header'>
                  <h3 className='card-title'>Microsoft</h3>
                </div>
                <div className='card-body'>
                  To make a contribution to the world by making tools for the mind that advance humankind.
                </div>
              </div>
            </div>
          </div>
          <div className='card' style={tweetStyle}>
            <div className='columns'>
              <div className='column col-2'>
                <figure className='avatar avatar-s'>
                  <img src='img/avatar-1.png' className='avatar-icon' />
                </figure>
              </div>
              <div className='column col-10'>
                <div className='card-header'>
                  <h3 className='card-title'>Microsoft</h3>
                </div>
                <div className='card-body'>
                  To make a contribution to the world by making tools for the mind that advance humankind.
                </div>
              </div>
            </div>
          </div>
          <div className='card' style={tweetStyle}>
            <div className='columns'>
              <div className='column col-2'>
                <figure className='avatar avatar-s'>
                  <img src='img/avatar-1.png' className='avatar-icon' />
                </figure>
              </div>
              <div className='column col-10'>
                <div className='card-header'>
                  <h3 className='card-title'>Microsoft</h3>
                </div>
                <div className='card-body'>
                  To make a contribution to the world by making tools for the mind that advance humankind.
                </div>
              </div>
            </div>
          </div>
          <div className='card' style={tweetStyle}>
            <div className='columns'>
              <div className='column col-2'>
                <figure className='avatar avatar-s'>
                  <img src='img/avatar-1.png' className='avatar-icon' />
                </figure>
              </div>
              <div className='column col-10'>
                <div className='card-header'>
                  <h3 className='card-title'>Microsoft</h3>
                </div>
                <div className='card-body'>
                  To make a contribution to the world by making tools for the mind that advance humankind.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tweets
