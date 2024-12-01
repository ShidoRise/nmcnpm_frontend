import React from "react";
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list-box">
            <h4>Customer Reviews</h4>
            {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <div className="review-rating">
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                        <p><strong>{review.user}</strong>: {review.comment}</p>
                        <p><small>{review.date}</small></p>
                    </div>
                ))
            ) : (
                <p>No reviews yet</p>
            )}
        </div>
    );
};

export default ReviewList;
