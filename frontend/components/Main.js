import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import UserLogin from './UserLogin'
import UserSignUp from './UserSignUp'
import Dashboard from './Dashboard'
import NoRoute from './NoRoute'

function authCheck (nextState, replace) {
  if (!window.localStorage.getItem('token')) {
    replace({
      pathname: '/login'
    })
  }
}

function checkURL (nextState, replace) {
  var token = window.location.search.substring(1).split('=')
  if (token[0] === 'token') {
    window.localStorage.setItem('token', token[1])
    replace({
      pathname: '/dashboard'
    })
  }
}

var routes = (
  <Router history={browserHistory}>
    <Route path='/login' component={UserLogin} onEnter={checkURL}/>
    <Route path='/signup' component={UserSignUp} />
    <Route path='/dashboard' component={Dashboard} onEnter={authCheck}/>
    <Route path='*' component={NoRoute} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#app'))
