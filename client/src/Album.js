import React, { useState } from 'react'
import './Album.css';

const Album = ({ album }) => {
    const [showReviews, setShowReviews] = useState(false)
    console.log(album.reviews)

    const getStars = (rating) => {
        return '⭐'.repeat(rating);
    };


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
            {showReviews ? album.reviews.map((review) => {
                return (
                    <div key={review.id} className="review-div">
                        <p>{review.user_name}: {review.comment} {getStars(review.rating)}</p>
                    </div>
                )
            }) : null}
        </div>
    )
}

export default Album;