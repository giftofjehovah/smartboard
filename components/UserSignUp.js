import React from 'react'
import {Link} from 'react-router'

class UserSignUp extends React.Component {
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
              <form>
               <div className='form-group'>
                <div className='input-group'>
                    <input className='form-input' type='text' id='firstname' placeholder='First Name' />
                    </div>
                  </div>
              <div className='form-group'>
               <div className='input-group'>
                   <input className='form-input' type='text' id='lastname' placeholder='Last Name' />
                   </div>
                 </div>
                <div className='form-group'>
                  <div className='input-group'>
                      <input className='form-input' type='text' id='email' placeholder='Email' />
                  </div>
                </div>
                <div className='form-group'>
                  <div className='input-group'>
                      <input className='form-input' type='password' id='password' placeholder='Password' />
                  </div>
                </div>
                <div className='form-group'>
                  <button className='btn btn-block btn-lg'>Create Free Account</button>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <h6 className='text-center'>New to SmartBoard? <Link to='/'>Login </Link></h6>
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
