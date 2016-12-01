import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/hourEntry">Hour Entry</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/schedulemaker">Schedule Maker</NavLink></li>
          <li><a href="calendar.html">Calendar</a></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
