import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext';

function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    function onSubmit(e){
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
                res.json().then((user) =>  {
                    setUser(user);
                    navigate.push('/');
                })
            } else {
                res.json().then((data) => {
                    setError(data.error || 'Registration failed');
                })
            }
        })
        .catch((error) => {
            setError('Network error');
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return(
        <div className="register-div">
            <h2>Register</h2>
            {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Username: 
                        <input style={{marginLeft:"5px"}} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input style={{marginLeft:"10px"}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
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