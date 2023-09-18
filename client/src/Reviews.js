import React, { useContext } from 'react'
import "./Album.css"
import UserContext from './context/UserContext';

function Reviews({ review }){

    const user = useContext(UserContext).user
    console.log(`user's username: ${user?.user_name}`)
    console.log(`review's username: ${review?.user_name}`)

    const getStars = (rating) => {
        return '⭐'.repeat(rating);
    };

    return(
        <div className="review-div">
            <p>{review?.user_name}: {review?.comment} {getStars(review?.rating)}</p>
            {review?.user_name === user?.user_name ? <p className="edit-comment">Edit</p> : null}
        </div>
    )
}

export default Reviews;