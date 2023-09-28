import React, { useState } from 'react'
import './Album.css';
import Reviews from './Reviews'

const Album = ({ album }) => {
    const [showReviews, setShowReviews] = useState(false)
    const [reviews, setReviews] = useState(album.reviews)
    const [newReviewComment, setNewReviewComment] = useState("")
    const [newReviewRating, setNewReviewRating] = useState(5)
    const [writingReview, setWritingReview] = useState(false)
    const [error, setError] = useState("")

    function handleUpdatedReview(updatedReview){
        setReviews((prevReviews) =>
            prevReviews.map((review) => review.id === updatedReview.id ? updatedReview : review)
        )
    }


    function handleStarClick(rating){
        setNewReviewRating(rating)
    }

    function renderRating(){
        let stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= newReviewRating)
                stars.push(<span className="review-stars" key={i} onClick={() => handleStarClick(i)}>⭐</span>)
            else{
                stars.push(<span className="review-stars" key={i} onClick={() => handleStarClick(i)}>☆</span>)
            }
        }
        return stars
    }

    function handlePostReview(){
        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to post a review");
            return;
        }
        
        fetch(`/albums/${album.id}/reviews`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({comment: newReviewComment, rating: newReviewRating})
        })
        .then((r) => {
            if(!r.ok) {
                return r.json().then((error) => Promise.reject(error))
            }
            return r.json()
        })
        .then((newReview) => {
            setReviews([...reviews, newReview])
            setWritingReview(false)
            setNewReviewComment("")
        })
        .catch((error) => setError(error))
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
            <div>
                <button id="write-review-button" onClick={() => setWritingReview(true)}>Write Review</button>
                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                <br/>
                <br/>
                    {writingReview ? 
                        <div>
                            <textarea id="review-box" value={newReviewComment} onChange={(e) => {setNewReviewComment(e.target.value)}}> </textarea>
                            {renderRating()}
                            <button className="review-post-cancel-buttons" onClick={handlePostReview}>Post</button>
                            <button className="review-post-cancel-buttons" onClick={() => setWritingReview(false)}>Cancel</button>
                        </div>
                    : 
                        null
                    }
                
            </div>
        </div>
    )
}

export default Album;