import React, { useState } from 'react'
import './Album.css';
import Reviews from './Reviews'

const Album = ({ album }) => {
    const [showReviews, setShowReviews] = useState(false)
    const [reviews, setReviews] = useState(album.reviews)

    function handleUpdatedReview(updatedReview){
        setReviews((prevReviews) =>
            prevReviews.map((review) => review.id === updatedReview.id ? updatedReview : review)
        )
    }

    return (
        <div>

            <div className="container" onClick={() => setShowReviews(!showReviews)}>
                <img
                    className="image"
                    src={album.image_url} 
                    alt={`${album.title} cover`} 
                    />
                <div className="details">
                    <p><strong>Title: </strong>{album.title}</p>
                    <p><strong>Artist: </strong>{album.artist}</p>
                    <p><strong>Release Date: </strong>{album.release_date}</p>
                </div>
            </div>
            {showReviews ? reviews.map((review) => {
                return (
                        <Reviews key={review.id} review={review} onUpdate={handleUpdatedReview} />
                )
            }) : null}
        </div>
    )
}

export default Album;