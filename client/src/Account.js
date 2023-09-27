import React, { useState, useContext } from 'react'
import UserContext from './context/UserContext';


function Account(){
    const { currentUser, setCurrentUser, setIsLoading } = useContext(UserContext);
    
    const [username, setUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleEditUserSubmit(e){
        e.preventDefault()
    }

    return (
        <div className="account">
            <h2 className="edit-user">Edit User Information</h2>
            <form onSubmit={handleEditUserSubmit}>
                <div>
                    <label>
                        Username: 
                        <input style={{marginLeft:"5px"}} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        New Password:
                        <input style={{marginLeft:"10px"}} type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => seNewtPassword(e.target.value)} required />
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
                    {loading ? 'Updating...' : 'Save Changes'}
                </button>
            </form>
        </div>
    )
}

export default Account;