import React, { useContext } from 'react';
import UserContext from './context/UserContext';


function Home(){
    const { currentUser, isLoading } = useContext(UserContext)
    
    if(isLoading) return <div>Loading...</div>
    else{
        return(
            <div className="home">
                {currentUser ? `Welcome to Music Reviewer, ${currentUser?.user.username}!` : "Welcome to Music Reviewer!"}
            </div>
        )
    }
}

export default Home;