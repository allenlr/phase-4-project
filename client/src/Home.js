import React, { useContext, useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import { isEmpty } from './utils';


function Home(){
    const { currentUser, isLoading } = useContext(UserContext)
    

    return(
        <div className="home">
            {!isEmpty(currentUser) && !isLoading ? `Welcome to Music Reviewer, ${currentUser.username}!` : "Welcome to Music Reviewer!"}
        </div>
    )
}

export default Home;