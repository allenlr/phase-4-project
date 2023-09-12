import React, { useContext, useEffect } from 'react';
import AlbumContext from './context/AlbumContext';
import Album from './Album';

function Albums(){

    const { albums, setAlbums } = useContext(AlbumContext);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('/albums');
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
            <br/>
            <br/>
            Albums
            {albums?.length > 0 ? albums.map(album => (
                <Album key={album.id} album={album} />
            )) : <p>Loading...</p>}
        </div>
    )
}


export default Albums;