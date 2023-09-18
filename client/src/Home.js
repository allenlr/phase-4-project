import React, { useContext } from 'react';
import UserContext from './context/UserContext';


function Home(){
    const user = useContext(UserContext).user
    console.log(user)
    return(
        <div>
            Welcome {user?.user_name}
        </div>
    )
}

export default Home;