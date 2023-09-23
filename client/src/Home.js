import React, { useContext } from 'react';
import UserContext from './context/UserContext';


function Home(){
    const { currentUser, isLoading } = useContext(UserContext)
    
    if(isLoading) return <div>Loading...</div>
    else{
        return(
            <div>
                {currentUser ? `Welcome, ${currentUser?.user.username}!` : "Welcome!"}
            </div>
        )
    }
}

export default Home;