import React, { useContext, useEffect } from 'react';
import UserContext from './context/UserContext';
import Login from './Login'


function Home(){
    const { currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        fetch('/auth', {
            credentials: 'include',
        })
            .then(res => {
                if(res.ok) {
                    res.json().then(user => setCurrentUser(user))
                }
            })
    }, [])
    
    if(!currentUser) return <Login />
    return(
        <div>
            Welcome {currentUser?.username}
        </div>
    )
}

export default Home;