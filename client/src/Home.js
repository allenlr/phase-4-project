import React, { useContext } from 'react';
import UserContext from './context/UserContext';


function Home(){
    const { currentUser, isLoading } = useContext(UserContext)

    console.log(currentUser)
    
    if(isLoading) return <div>Loading...</div>
    else{
        return(
            <div>
                Welcome {currentUser?.username}
            </div>
        )
    }
}

export default Home;