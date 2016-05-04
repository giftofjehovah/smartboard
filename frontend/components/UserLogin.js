import React from 'react'
import startOauth from 'spa-oauth'
import {Link, browserHistory} from 'react-router'
import User from '../models/User'

class UserLogin extends React.Component {
  constructor () {
    super()
    this.state = {
      flashMsg: ''
    }
  }

  fbLogin (event) {
    event.preventDefault()
    var _this = this
    startOauth('facebook', 'http://localhost:3000/auth/facebook', 'facebook', function (params) {
      if (params.token) {
        console.log(params)
        window.localStorage.setItem('token', params.token)
        if (params.twitter !== 'undefined') window.localStorage.setItem('twitter', params.twitter)
        browserHistory.push('/dashboard')
      } else {
        _this.setState({
          flashMsg: 'Unable to login'
        })
      }
    })
  }

  localLogin (event) {
    event.preventDefault()
    var _this = this
    var ref = this.refs
    var user = new User(null, null, ref.email.value, ref.password.value)
    user.login(function (res, body) {
      var data = JSON.parse(body)
      if (data.token) {
        window.localStorage.setItem('token', data.token)
        if (data.twitter !== 'undefined') window.localStorage.setItem('twitter', data.twitter)
        browserHistory.push('/dashboard')
      } else {
        _this.setState({
          flashMsg: data.message
        })
      }
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column col-4' />
          <div className='column col-4'>
            <div className='card'>
              <div className='card-header text-center'>
                <h4 className='card-title'>Login</h4>
                <h6 className='card-meta'>Please fill up your information</h6>
                <span>{this.state.flashMsg}</span>
              </div>
              <div className='card-body'>
                <form onSubmit={this.localLogin.bind(this)}>
                  <div className='form-group'>
                    <div className='input-group'>
                      <span className='input-group-addon'><i className='fa fa-envelope'></i></span>
                        <input ref='email' className='form-input' type='text' id='email' placeholder='Email' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group'>
                      <span className='input-group-addon'><i className='fa fa-unlock-alt'></i></span>
                        <input ref='password' className='form-input' type='password' id='password' placeholder='Password' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <button className='btn btn-block btn-lg'>Submit</button>
                  </div>
                  <div className='form-group'>
                    <button onClick={this.fbLogin.bind(this)} className='btn btn-block btn-primary btn-lg'><i className='fa fa-facebook-square' aria-hidden='true'></i> Login with Facebook</button>
                  </div>
                </form>
              </div>
              <div className='card-footer'>
                <h6 className='text-center'>New to SmartBoard? <Link to='/signup'>Sign Up</Link></h6>
              </div>
            </div>
          </div>
          <div className='column col-4' />
        </div>
      </div>

    )
  }
}

export default UserLogin
