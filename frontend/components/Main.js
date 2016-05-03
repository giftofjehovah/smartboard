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

var routes = (
  <Router history={browserHistory}>
    <Route path='/login' component={UserLogin} />
    <Route path='/signup' component={UserSignUp} />
    <Route path='/dashboard' component={Dashboard} onEnter={authCheck}/>
    <Route path='*' component={NoRoute} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#app'))
