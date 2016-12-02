import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './modules/App'
var LogIn = require('./modules/components/LogIn/LogIn');
var HourSetter = require('./modules/components/HourSetter/HourSetter');
var WeekSetter = require('./modules/components/WeekSetter/WeekSetter');
var ScheduleMaker = require('./modules/components/ScheduleMaker/ScheduleMaker');

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LogIn}/>
      <Route path="/weekset" component={WeekSetter}/>
      <Route path="/hourset" component={HourSetter}/>
      <Route path="/calendar" component={ScheduleMaker}/>
    </Route>
  </Router>
), document.getElementById('app'))
