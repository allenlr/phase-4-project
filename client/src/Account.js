import React, { useState, useContext } from 'react'
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router-dom';


function Account(){
    const { currentUser, setCurrentUser, setIsLoading, isLoading } = useContext(UserContext);
    
    const [newUsername, setNewUsername] = useState(currentUser?.username || "")
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newEmail, setNewEmail] = useState(currentUser?.email || "");
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    function handleEditUserSubmit(e){
        e.preventDefault()
        setError(null);

        const user = {
            password: newPassword,
            oldPassword: oldPassword,
            username: newUsername,
            email: newEmail,
        }

        const token = localStorage.getItem('token')
        setIsLoading(true);
        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error("Incorrect password or unauthorized access");
                    } else {
                        return res.json().then(data => {
                            throw new Error(data.error || "Unknown error");
                        })
                    }
                }
                return res.json();
            })
            .then(data => {
                setCurrentUser(data);
                setShowSuccessMessage(true)
                setIsLoading(false);     
            })
            .catch((error) => setError(error.message))
            .finally(setIsLoading(false))
    }

    function deleteUser(){
        const token = localStorage.getItem('token')
        fetch(`/users/${currentUser.id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ oldPassword })
        })
        .then(res => {
            if (!res.ok){
                return res.json().then(data => {
                    throw new Error(data.error || "Unknown error");
                })
                
            } else{
                setCurrentUser({})
                navigate('/');
            }
        })
        .catch(error => {
            setError(error.message)
        })   
        }
        
        console.log(error)
    
    if(!currentUser?.username) return <div>Loading...</div>
    else{
        return (
            <div className="account">
                <h2 className="edit-user">Edit User Information</h2>
                {showSuccessMessage && <div style={{ color: 'green' }}>Changes Saved</div>}
                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                <form onSubmit={handleEditUserSubmit}>
                    <div>
                        <label>
                            New Username: 
                            <input style={{marginLeft:"3px"}} type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Old Password:
                            <input style={{marginLeft:"14.6px"}} type={showOldPassword ? "text" : "password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                        </label>
                        <button style={{fontSize: "10px", marginLeft: "5px"}} type="button" onClick={() => setShowOldPassword((prev) => !prev)}>
                            {showOldPassword ? "🚫👁️" : "👁️"}
                        </button>
                    </div>
                    <div>
                        <label>
                            New Password:
                            <input style={{marginLeft:"8px"}} type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </label>
                        <button style={{fontSize: "10px", marginLeft: "5px"}} type="button" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? "🚫👁️" : "👁️"}
                        </button>
                    </div>
                    
                    <div>
                        <label>
                            New Email:
                            <input style={{marginLeft:"36.6px"}} type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        </label>
                    </div>
                    <button id="save-changes-button" type="submit" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Save Changes'}
                    </button>
                    <br/>
                    <button onClick={deleteUser} id="delete-user-button" disabled={isLoading}>
                        {'Delete Account'}
                    </button>
                </form>
            </div>
        )
    }
}

export default Account;