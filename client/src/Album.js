import React from 'react'

const Album = ({ album }) => {
    return (
        <div className="album-div">
            <label className="album-info">Title: </label>
            {album.title}
            <br/>
            <label className="album-info">Artist: </label>
            {album.artist}
            <br/>
            <label className="album-info">Release Date: </label>
            {album.release_date}
            <br/>
            <img 
                src={album.image_url} 
                alt={`${album.title} cover`} 
                style={{
                    width: '150px', 
                    height: '150px', 
                    objectFit: 'cover'
                }}
            />
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Album;