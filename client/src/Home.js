import React, { useContext } from 'react';
import UserContext from './context/UserContext';


function Home(){
    const { currentUser, isLoading } = useContext(UserContext)
    
    if(isLoading || currentUser === undefined) return <div>Loading...</div>
    else{
        return(
            <div>
                Welcome {currentUser?.user.username}!
            </div>
        )
    }
}

export default Home;