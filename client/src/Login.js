import React, { useContext, useState } from 'react';
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login(){

    const navigate = useNavigate();

    const {currentUser, setCurrentUser, isLoading, setIsLoading} = useContext(UserContext);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: { username, password }}),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.jwt) {
                    localStorage.setItem("token", data.jwt);
                    setCurrentUser(data.user);
                    setError("");
                    setIsLoading(false);
                    navigate('/');
                } else {
                    console.log(data)
                    setError(data.error);
                    setIsLoading(false);
                }
            });
    }

    console.log(currentUser)



    return(
        <div>
            Login
            <br/>
            <br/>
            <form onSubmit={handleLogin}>
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
                {error ? <p style={{color: "red"}}>{error}</p> : null}
            </form>
        </div>
    )
}

export default Login;