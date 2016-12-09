import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './modules/App'
var LogIn = require('./modules/components/LogIn/LogIn');
var HourSetter = require('./modules/components/HourSetter/HourSetter');
//var HourSetter = require('./modules/components/HourSetter/hoursetar');
var WeekSetter = require('./modules/components/WeekSetter/WeekSetter');
var ScheduleMaker = require('./modules/components/ScheduleMaker/ScheduleMaker');
var LACreator = require('./modules/components/LACreator/LACreator');

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ScheduleMaker}/>
      <Route path="/weekset" component={WeekSetter}/>
      <Route path="/login" component={LogIn}/>
      <Route path="/hourset" component={HourSetter}/>
      <Route path="/create" component={LACreator}/>
    </Route>
  </Router>
), document.getElementById('app'))
