import React from "react";
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list-box">
            <h4>Customer Reviews</h4>
            {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <div className="review-item-name">
                            <p><strong>{review.user.name}</strong> </p>
                        </div>
                        <div className="review-rating">
                            <div className="rating-resultstar">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                            </div>
                            <div className="rating-comment">
                                <p>{review.comment}</p>

                                <p><small>{review.date}</small></p>
                            </div>
                        </div>


                    </div>
                ))
            ) : (
                <p>No reviews yet</p>
            )}
        </div>
    );
};

export default ReviewList;
