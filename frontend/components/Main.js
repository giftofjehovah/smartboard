import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import UserLogin from './UserLogin'
import UserSignUp from './UserSignUp'
import Dashboard from './Dashboard'
import NoRoute from './NoRoute'

var routes = (
  <Router history={browserHistory}>
    <Route path='/login' component={UserLogin} />
    <Route path='/signup' component={UserSignUp} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='*' component={NoRoute} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#app'))
