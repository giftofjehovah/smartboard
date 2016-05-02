import React from 'react'
import startOauth from 'spa-oauth'
import {Link} from 'react-router'

class UserLogin extends React.Component {
  fbLogin (event) {
    event.preventDefault()
    startOauth('facebook', 'http://localhost:3000/auth/facebook', 'facebook', function (params) {
      console.log(params)
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
              </div>
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <div className='input-group'>
                      <span className='input-group-addon'><i className='fa fa-envelope'></i></span>
                        <input className='form-input' type='text' id='email' placeholder='Email' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group'>
                      <span className='input-group-addon'><i className='fa fa-unlock-alt'></i></span>
                        <input className='form-input' type='password' id='password' placeholder='Password' />
                    </div>
                  </div>
                  <div className='form-group'>
                    <button className='btn btn-block btn-lg'>Submit</button>
                  </div>
                  <div className='form-group'>
                    <button onClick={this.fbLogin} className='btn btn-block btn-primary btn-lg'><i className='fa fa-facebook-square' aria-hidden='true'></i> Login with Facebook</button>
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
