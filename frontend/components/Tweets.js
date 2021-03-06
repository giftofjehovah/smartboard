import React from 'react'
import Twitter from '../models/Twitter'
import io from 'socket.io-client'
import {browserHistory} from 'react-router'

class Tweets extends React.Component {

  constructor () {
    super()
    this.state = {
      tweets: [],
      button: ''
    }
  }

  componentWillMount () {
    var buttonStyles = {
      top: '200px'
    }
    var twitterButton = (<button onClick={this.firstLogin.bind(this)} className='btn btn-primary btn-lg centered' style={buttonStyles}><i className='fa fa-twitter-square'></i> Login with Twitter</button>)
    if (window.localStorage.getItem('twitter') && window.localStorage.getItem('twitter') !== 'undefined') {
      twitterButton = ''
      this.getTweetsAndStreamTweets()
    }
    this.setState({
      button: twitterButton
    })
  }

  getTweetsAndStreamTweets () {
    var _this = this
    var twitter = new Twitter()
    twitter.getTweets(function (tweets) {
      var newTweets = tweets.map(_this.transformTweets)
      _this.setState({tweets: newTweets})
      _this.streamTweets()
    })
  }

  firstLogin () {
    var _this = this
    var twitter = new Twitter()
    twitter.login(function () {
      _this.getTweetsAndStreamTweets()
      _this.setState({button: ''})
    })
  }

  logOut () {
    window.localStorage.clear()
    browserHistory.push('/login')
  }

  streamTweets () {
    var _this = this
    const socket = io(window.location.host)
    socket.on('connect', function () {
      console.log('connected')
      socket.emit('start')
    })

    socket.on('tweets', function (tweet) {
      if (!tweet.friends) {
        var newTweet = []
        newTweet.push(tweet)
        var transformTweet = newTweet.map(_this.transformTweets)
        _this.state.tweets.unshift(transformTweet)
        _this.setState({tweets: _this.state.tweets})
      }
    })
  }

  transformTweets (tweet) {
    var tweetStyle = {
      marginTop: '5px'
    }
    return (
      <div key={tweet.id}className='card' style={tweetStyle}>
        <div className='columns'>
          <div className='column col-2 avatar avatar-xl'>
              <img src={tweet.user.profile_image_url} className='avatar-icon' />
          </div>
          <div className='column col-10'>
            <div className='card-header'>
              <h3 className='card-title'>{tweet.user.name}</h3>
            </div>
            <div className='card-body text-overflow'>
              {tweet.text}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    var styles = {
      height: '93vh',
      border: 'solid 2px darkgrey'
    }

    var cardBodyStyles = {
      height: '92%',
      overflow: 'scroll'
    }

    var exitButton = {
      display: 'flex'
    }

    return (
      <div className='card' style={styles}>
        <div style={exitButton}>
          <button onClick={this.logOut} className='btn btn-link'><span className='fa fa-sign-out fa-2x'></span> </button>
          <div className='card-header text-center'>
            <h4 className='card-title text-center'><small className='card-meta'><i className='fa fa-twitter fa-2x'></i>Tweets</small></h4>
          </div>
        </div>
        <div className='card-body' style={cardBodyStyles}>
          {this.state.button}
          {this.state.tweets}
        </div>
      </div>
    )
  }
}

export default Tweets
