import React, { useContext, useEffect, useState } from 'react';
import AlbumContext from './context/AlbumContext';
import Album from './Album';
import './Album.css'

function Albums(){

    const { albums, setAlbums } = useContext(AlbumContext);
    const [showAlbumForm, setShowAlbumForm] = useState(false)
    const [title, setTitle] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [artist, setArtist] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [error, setError] = useState([])

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

    function handleAlbumCreate(e){
        e.preventDefault()
        const token = localStorage.getItem("token")
        const album = {
            title: title,
            artist: artist,
            image_url: imgUrl,
            release_date: releaseDate
        }
        fetch(`/albums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ album })
        })
        .then((r) => {
            if (!r.ok) {
                return r.json().then((error) => {
                    console.log(error)
                    setError(error)
                    throw new Error('Server validation error');
                });
            }
            return r.json();
        })
        .then((newAlbum) => {
            console.log(newAlbum)
            setAlbums([...albums, newAlbum]);
            setShowAlbumForm(false)
        })
        .catch((error) => {
            setError(error)
        })

    }

    return(
        <div className="albums-container">
            <br/>
            <br/>
            <h2 className="albums-head">
                Albums:
            </h2>
            <div className="album-list">
                {albums?.length > 0 ? albums.map(album => (
                    <Album key={album.id} album={album} />
                )) : <p>Loading...</p>}
            </div>
            <button className="create-album-button" style={{marginBottom: "20px"}}onClick={() => {setShowAlbumForm(!showAlbumForm)}}>Post Album</button>
            {error.length > 0 ? error.map((err, index) => {
                <span key={index} style={{color: "red"}}>{err}</span>
            }) : null}
            {showAlbumForm ? 
                <form onSubmit={handleAlbumCreate}>
                    <div>
                        <label>
                            Title: 
                            <input style={{marginLeft:"50px"}} type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Artist:
                            <input style={{marginLeft:"42px"}} type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Image Url:
                            <input style={{marginLeft:"10px"}} type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Release Date:
                            <input style={{marginLeft:"10px", marginBottom: "20px"}} type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                        </label>
                    </div>
                    <button type="submit" style={{marginBottom: "60px"}}>Create Album</button>
                </form> : null}
                
        </div>
    )
}


export default Albums;