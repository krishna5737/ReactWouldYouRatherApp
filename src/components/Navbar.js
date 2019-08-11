import React from 'react';
import {NavLink, Link} from 'react-router-dom';

var Navbar = function Navbar(loggedInUser) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                    <NavLink to='/' exact activeClassName='active'
                                className="nav-item nav-link navbar-brand">Home</NavLink>
                    <NavLink to='/add' exact activeClassName='active'
                                className="nav-item nav-link">New Question</NavLink>
                    <NavLink to='/scoreboard' exact activeClassName='active'
                                className="nav-item nav-link">Scoreboard</NavLink>
                </ul>

                <span
                    className="navbar-text margin-left-100 margin-right-25 text-info">Hello {loggedInUser.loggedInUser.name}</span>
                <span className="navbar-nav"><Link to="/logout"><button
                    className="btn-sm btn-primary">Logout</button></Link></span>
            </nav>
        </div>
    )
};

export default Navbar;