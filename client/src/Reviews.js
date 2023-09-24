import React, { useContext, useState } from 'react'
import "./Album.css"
import UserContext from './context/UserContext';

function Reviews({ review }){

    const currentUser = useContext(UserContext).currentUser
    const [editing, setEditing] = useState(false)
    const [comment, setComment] = useState(review?.comment)
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
            body: JSON.stringify({ comment: comment })
        })
        .then((r) => {
            if (!r.ok) {
                return r.json().then((error) => Promise.reject(error));
            }
            return r.json();
        })
        .then((updatedReview) => {
            setComment(updatedReview.comment);
            setEditing(false)
        })
        .catch((error) => {
            setError(error)
        })
    }

    function handleCancel(){
        setComment(review?.comment)
        setEditing(false)
    }


    const getStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    return(
        <div className="review-div">
            <p>{review?.user_name}: {review?.comment} {getStars(review?.rating)}</p>
            {review?.user_name === currentUser?.user.username ? <span onClick={handleEdit} className="edit-comment">Edit <i class="fa fa-pencil"></i></span> : null}
            {editing ? 
            <>
            <textarea onChange={handleCommentChange} value={comment}> </textarea> 
            {error ? <span style={{color: "red"}}>{error}</span> : null}
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            </>
            : null}
        </div>
    )
}

export default Reviews;