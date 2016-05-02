import React from 'react'
import {Link} from 'react-router'
import User from '../models/User'

class UserSignUp extends React.Component {
  signUp (event) {
    event.preventDefault()
    var ref = this.refs
    var user = new User(ref.firstName.value, ref.lastName.value, ref.email.value, ref.password.value)
    user.signUp(function (res, body) {
      console.log(body)
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
              <h4 className='card-title'>Register</h4>
              <h6 className='card-meta'>Please fill up your information</h6>
            </div>
            <div className='card-body'>
              <form onSubmit={this.signUp.bind(this)}>
               <div className='form-group'>
                <div className='input-group'>
                    <input ref='firstName' className='form-input' type='text' id='firstname' placeholder='First Name' />
                    </div>
                  </div>
              <div className='form-group'>
               <div className='input-group'>
                   <input ref='lastName' className='form-input' type='text' id='lastname' placeholder='Last Name' />
                   </div>
                 </div>
                <div className='form-group'>
                  <div className='input-group'>
                      <input ref='email' className='form-input' type='text' id='email' placeholder='Email' />
                  </div>
                </div>
                <div className='form-group'>
                  <div className='input-group'>
                      <input ref='password' className='form-input' type='password' id='password' placeholder='Password' />
                  </div>
                </div>
                <div className='form-group'>
                  <button className='btn btn-block btn-lg'>Create Free Account</button>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <h6 className='text-center'>New to SmartBoard? <Link to='/login'>Login </Link></h6>
            </div>
          </div>
        </div>
        <div className='column col-4' />
      </div>
    </div>
    )
  }
}

export default UserSignUp
