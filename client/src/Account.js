import React, { useState, useContext } from 'react'
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router-dom';


function Account(){
    const { currentUser, setCurrentUser, setIsLoading } = useContext(UserContext);
    
    const [newUsername, setNewUsername] = useState(currentUser?.user.username)
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newEmail, setNewEmail] = useState(currentUser?.user.email);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);

    const navigate = useNavigate();

    function handleEditUserSubmit(e){
        e.preventDefault()
        setLoading(false);
        setError(null);

        const user = {
            oldPassword,
            username: newUsername?.length > 0 ? newUsername : currentUser?.user.username,
            password: newPassword?.length > 0 ? newPassword : oldPassword,
            email: newEmail?.length > 0 ? newEmail : currentUser?.user.email,
        }

        console.log(currentUser)

        const token = localStorage.getItem('token')
        fetch(`/users/${currentUser?.user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then((res => {
                if(res.ok){
                    setCurrentUser({user: {username: newUsername, password: newPassword, email: newEmail} })
                }
                else{
                    res.json().then((data) => {
                        setError(data.error || "Error Editing User")
                    })
                }
                    
            }))
            .catch((error) => setError(error))
            .finally(setIsLoading(false))
    }

    function deleteUser(){
        const token = localStorage.getItem('token')
        fetch(`/users/${currentUser.user.id}`,{
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
                setCurrentUser(undefined)
                navigate('/');
            }
        })
        .catch(error => setError(error.message))   
        }
    

    return (
        <div className="account">
            <h2 className="edit-user">Edit User Information</h2>
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
                <button id="save-changes-button" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                </button>
                <br/>
                <button onClick={deleteUser} id="delete-user-button" disabled={loading}>
                    {'Delete Account'}
                </button>
            </form>
        </div>
    )
}

export default Account;