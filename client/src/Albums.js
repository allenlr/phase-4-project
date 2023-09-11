import React, { useContext, useEffect } from 'react';
import AlbumContext from './context/AlbumContext';

function Albums(){

    const { albums, setAlbums } = useContext(AlbumContext);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('http://localhost:3000/albums');
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error('Failed to fetch albums', error);
            }
        };
        fetchAlbums();
    }, [setAlbums])
    return(
        <div>
            Albums
            {albums ? albums.map(album => (
                <div key={album.id}>{album.title}</div>
            )) : <p>Loading...</p>}
        </div>
    )
}


export default Albums;