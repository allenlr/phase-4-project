import React, { useState } from 'react'

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;