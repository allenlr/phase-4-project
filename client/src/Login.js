import React, { useContext, useState, useEffect } from 'react';
import UserContext from './context/UserContext';

function Login(){

    const {user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                return r.json().then((data) => Promise.reject(data));
            }
        })
        .then((user) => setUser(user))
        .catch((error) => console.error('Error', error));
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((r) => r.json())
            .then((user) => setUser(user));
    }
    console.log(user)

    if(user?.username) {
        return <h2>Welcome, {user.username}!</h2>
    } else {
        return(
            <div>
                Login
                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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