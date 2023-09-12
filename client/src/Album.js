import React from 'react'
import './Album.css';

const Album = ({ album }) => {
    return (
        <div className="container">
            <img
                className="image"
                src={album.image_url} 
                alt={`${album.title} cover`} 
            />
            <div className="details">
                <p><strong>Title: </strong>{album.title}</p>
                <p><strong>Artist: </strong>{album.artist}</p>
                <p><strong>Release Date: </strong>{album.release_date}</p>
                {/* <label className="album-info">Title: </label>
                {album.title}
                <br/>
                <label className="album-info">Artist: </label>
                {album.artist}
                <br/>
                <label className="album-info">Release Date: </label>
                {album.release_date} */}
            </div>
        </div>
    )
}

export default Album;