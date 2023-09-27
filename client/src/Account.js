import React, { useState, useContext } from 'react'
import UserContext from './context/UserContext';


function Account(){
    const { currentUser, setCurrentUser, setIsLoading } = useContext(UserContext);
    
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newEmail, setNewEmail] = useState('');
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
                        New Username: 
                        <input style={{marginLeft:"3px"}} type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        New Password:
                        <input style={{marginLeft:"8.7px"}} type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </label>
                    <button style={{fontSize: "10px", marginLeft: "5px"}} type="button" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? "🚫👁️" : "👁️"}
                    </button>
                </div>
                <div>
                    <label>
                        New Email:
                        <input style={{marginLeft:"37px"}} type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                    </label>
                </div>
                <button id="save-changes-button" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                </button>
            </form>
        </div>
    )
}

export default Account;