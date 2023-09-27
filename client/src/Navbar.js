import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './context/UserContext';

function Navbar(){

    const { currentUser, setCurrentUser } = useContext(UserContext);

    function handleLogout() {
        localStorage.removeItem("token");
        setCurrentUser(null);
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
                {!currentUser ? <Link to="/register" className="nav-link">
                    Register
                </Link> : <Link to="/account" className="nav-link">My Account</Link>}
                {currentUser ? 
                    <button id="logout-button" onClick={handleLogout}>Logout</button> 
                    : 
                    <Link to="/login" className="nav-link">
                    Login
                    </Link>
                }
            </div>

        </nav>
    )
}

export default Navbar;