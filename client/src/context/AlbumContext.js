import React, { useState } from 'react';

const AlbumContext = React.createContext();

export const AlbumProvider = ({ children }) => {
    const [albums, setAlbums] = useState([]);

    return (
        <AlbumContext.Provider value={{ albums, setAlbums }}>
            {children}
        </AlbumContext.Provider>
    );
};

export default AlbumContext;