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
  var params = window.location.search.substring(1).split('&')
  var objParams = {}
  for (var i = 0; i < params.length; i++) {
    var obj = params[i].split('=')
    objParams[obj[0]] = obj[1]
  }
  for (var key in objParams) {
    window.localStorage.setItem(key, objParams[key])
  }
  if (window.localStorage.getItem('token')) {
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
