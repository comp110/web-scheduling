import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
import Login from './modules/Login'
import HourEntry from './modules/HourEntry'
import ScheduleMaker from './modules/ScheduleMaker'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/hourEntry" component={HourEntry}/>
      <Route path="/login" component={Login}/>
      <Route path="/schedulemaker" component={ScheduleMaker}/>
    </Route>
  </Router>
), document.getElementById('app'))
