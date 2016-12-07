import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Log In</NavLink></li>
          <li><NavLink to="/hourset">HourSet</NavLink></li>
          <li><NavLink to="/weekset">WeekSet</NavLink></li>
          <li><NavLink to="/calendar">Calendar</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
