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
                    <NavLink className="nav-link view-la" to="/hourset">My Hours</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-admin" to="/weekset">Master Schedule</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-admin" to="/create">Create New LA</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link view-la" to="/" onClick={logout}>Logout</NavLink>
                </li>
            </ul>
        </nav>
                    {this.props.children}
      </div>
    )
  }
})
