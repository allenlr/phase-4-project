import React, { useContext, useState, useEffect } from 'react';
import UserContext from './context/UserContext';

function Login({ onLogin }){

    const {user, setUser } = useContext(UserContext)
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
        fetch("/me").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, password }),
        })
            .then((r) => r.json())
            .then((user) => onLogin(user));
    }

    if(user) {
        return <h2>Welcome, {user.username}!</h2>
    } else {
        return(
            <div>
                Login
                <br/>
                <br/>
                <form>
                    username
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <br/>
                    password
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? "🚫👁️" : "👁️"}
                    </button>
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;