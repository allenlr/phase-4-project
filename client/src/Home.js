import React, { useContext, useEffect } from 'react';
import UserContext from './context/UserContext';
import Login from './Login'


function Home(){
    const { currentUser, isLoading } = useContext(UserContext)
    
    if(isLoading) return <div>Loading...</div>
    // if(!currentUser) return <Login />
    return(
        <div>
            Welcome {currentUser?.username}
        </div>
    )
}

export default Home;