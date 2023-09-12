import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './context/UserContext';

function Navbar(){

    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(undefined));
    }

    return(
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Home
            </Link>
            <div className="navbar-nav">
                <Link to="/albums" className="nav-link">
                    Albums
                </Link>
                <Link to="/login" className="nav-link">
                    Login
                </Link>
                <Link to="/register" className="nav-link">
                    Register
                </Link>
                {user ? <button onClick={handleLogout}>Logout</button> : null}
            </div>

        </nav>
    )
}

export default Navbar;