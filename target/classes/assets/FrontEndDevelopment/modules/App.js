import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div className="container" style={{
        height: 100,
        width: 800
        }}>
        <nav className="navbar navbar-inverse -bg-faded">
            <ul role="nav" className="nav navbar-nav">
                <li className="nav-item active" style={{
                    color: 'white'
                }}>
                    <h1>Hour Entry Form</h1>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" onlyActiveOnIndex>Log In</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/hourset">HourSet</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/weekset">WeekSet</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                </li>
            </ul>
                    {this.props.children}
        </nav>
        
      </div>
    )
  }
})
