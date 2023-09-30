import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext';

function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleRegisterSubmit(e){
        e.preventDefault();
        setLoading(false);
        setError(null);

        const user = {
            username,
            password,
            email,
        };

        fetch(`/users`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error || 'Registration failed');
                })
            }
        })
        .then((user) => {
            console.log(user);
            if (user && user.jwt) {
                localStorage.setItem("token", user.jwt);
                setCurrentUser(user);
                navigate('/');
            }
            else {
                setError("Token not received from server. Please try again.");
            }
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return(
        <div className="register-div">
            <h2>Register</h2>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <label>
                        Username: 
                        <input style={{marginLeft:"5px"}} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input style={{marginLeft:"10px"}} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button style={{fontSize: "10px", marginLeft: "5px"}} type="button" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? "🚫👁️" : "👁️"}
                    </button>
                </div>
                <div>
                    <label>
                        Email:
                        <input style={{marginLeft:"38.5px"}} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                </div>
                <button id="register-button" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}

export default Register;