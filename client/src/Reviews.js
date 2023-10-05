import React, { useContext, useState } from 'react'
import "./Album.css"
import UserContext from './context/UserContext';

function Reviews({ review, onUpdate, onDelete }){

    const currentUser = useContext(UserContext).currentUser

    const [editing, setEditing] = useState(false)
    const [comment, setComment] = useState(review?.comment)
    const [rating, setRating] = useState(review?.rating)
    const [error, setError] = useState("")

    function handleEdit(){
        setEditing(true)
    }

    function handleCommentChange(e){
        setComment(e.target.value)
    }

    function handleSave(){
        const token = localStorage.getItem("token");

        fetch(`/albums/${review.album_id}/reviews/${review.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ comment: comment, rating: rating })
        })
        .then((r) => {
            if (!r.ok) {
                return r.json().then((error) => {
                    console.log(error)
                    setError(error)
                });
            }
            return r.json();
        })
        .then((updatedReview) => {
            setComment(updatedReview.comment);
            onUpdate(updatedReview);
            setEditing(false)
        })
        .catch((error) => {
            setError(error)
        })
    }

    function handleDelete(){
        const token = localStorage.getItem("token")
        fetch(`/users/${review.user_id}/reviews/${review.id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        .then((res) => {
            if (res.ok){
                onDelete(review.id)
            }
        })
        .catch((error) => setError(error))
    }

    function handleCancel(){
        setComment(review?.comment)
        setEditing(false)
    }

    const getStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    }

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} onClick={() => handleStarClick(i)}>⭐</span>);
            } else {
                stars.push(<span key={i} onClick={() => handleStarClick(i)}>☆</span>);
            }
        }
        return stars;
    }

    return(
        <div className="review-div">
            <span style={{color: 'rgb(67, 237, 150)'}}>{review?.user_name} : </span>
            <span>
                {review?.comment} {getStars(review?.rating)}
                {review?.user_id === currentUser?.id ? <span onClick={handleEdit} className="edit-comment">Edit <i class="fa fa-pencil"></i></span> : null}
                {review?.user_id === currentUser?.id ? <span className="delete-review" onClick={handleDelete}>Delete</span> : null}
            </span>     
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {editing ? 
                <>
                    <textarea id="comment-edit-box" onChange={handleCommentChange} value={comment}> </textarea>
                    {renderStars()}
                    {error ? <span style={{color: "red"}}>{error}</span> : null}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            : null}
        </div>
    )
}

export default Reviews;