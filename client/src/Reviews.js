import React, { useContext } from 'react'
import "./Album.css"
import UserContext from './context/UserContext';

function Reviews({ review }){

    const currentUser = useContext(UserContext).currentUser
    console.log(`user's username: ${currentUser?.username}`)
    console.log(`review's username: ${review?.user_name}`)


    const getStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    return(
        <div className="review-div">
            <p>{review?.user_name}: {review?.comment} {getStars(review?.rating)}</p>
            {review?.user_name === currentUser?.username ? <p className="edit-comment">Edit</p> : null}
        </div>
    )
}

export default Reviews;