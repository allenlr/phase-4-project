import React, { useContext, useState } from 'react';
import UserContext from './context/UserContext';

function Login(){

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        })
            .then((r) => r.json())
            .then((user) => setCurrentUser(user));
    }
    // console.log(currentUser)

    if(currentUser?.username) {
        return <h2>Welcome, {currentUser.username}!</h2>
    } else {
        return(
            <div>
                Login
                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    username: 
                    <input
                        style={{marginLeft: "5px"}}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    password:
                    <input
                        style={{marginLeft: "6px"}}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button style={{fontSize: "10px", marginLeft: "5px"}} type="button" onClick={() => setShowPassword((prev) => !prev)}>
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