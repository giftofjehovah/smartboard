import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import UserLogin from './UserLogin'
import UserSignUp from './UserSignUp'

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={UserLogin} />
    <Route path='/signup' component={UserSignUp} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#app'))
