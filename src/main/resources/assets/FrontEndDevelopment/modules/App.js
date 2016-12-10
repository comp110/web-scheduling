import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-inverse -bg-faded">
            <ul role="nav" className="nav navbar-nav">
                <li className="nav-item active" style={{
                    color: 'white'
                }}>
                    <h2>COMP 110</h2>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/" onlyActiveOnIndex>Calendar</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-unauth-only" to="/login" >Log In</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-la" to="/hourset">Set Weekly Hours</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-admin" to="/weekset">Set Master Schedule</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-admin" to="/create">Create New LA</NavLink>
                </li>
            </ul>
        </nav>
                    {this.props.children}
      </div>
    )
  }
})
