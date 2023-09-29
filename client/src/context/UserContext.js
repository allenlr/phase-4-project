import React, { useState } from 'react'

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log(currentUser)

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;