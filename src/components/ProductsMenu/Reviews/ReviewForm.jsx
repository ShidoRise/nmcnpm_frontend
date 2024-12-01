import React, { useState } from "react";
import './ReviewForm.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewForm = ({ onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || !comment.trim()) {
            alert("Vui lòng cung cấp đánh giá và bình luận.");
            return;
        }

        const newReview = {
            user: "CurrentUser",
            rating,
            comment,
            date: new Date().toLocaleString(),
        };

        onAddReview(newReview);
        setRating(0);
        setComment("");
    };

    return (
        <div className="review-form-box">
            <h4>Product Reviews</h4>
            <div className="star-box">
                <label>Rating Star:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        type="button"
                        key={star}
                        className={`star-button ${star <= rating ? "active" : ""}`}
                        onClick={() => setRating(star)}
                    >
                        {star <= rating ? <FaStar /> : <FaRegStar />}
                    </button>
                ))}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="Write your review here..."
            ></textarea>
            <button className="button-submitform" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ReviewForm;
