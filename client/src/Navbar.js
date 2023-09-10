import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Home
            </Link>
            <div className="navbar-nav">
                <Link to="/albums" classname="nav-link">
                    Albums
                </Link>
                <Link to="/login" className="nav-link">
                    Login
                </Link>
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;