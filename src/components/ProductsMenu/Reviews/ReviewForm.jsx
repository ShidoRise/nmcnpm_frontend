import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './ReviewForm.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewForm = ({ onAddReview }) => {
    const user = useSelector((state) => state.user.user); // Lấy thông tin user từ Redux
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [name, setName] = useState(user?.name || "");
    const [username, setUsername] = useState(user?.username || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || !comment.trim()) {
            alert("Vui lòng cung cấp đánh giá và bình luận.");
            return;
        }

        const newReview = {
            user: {
                name: user?.name ? `${user.name}` : 'Anonymous', // Sử dụng tên từ Redux
                username: user?.username ? `${user.username}` : '', // Sử dụng username từ Redux
            },
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
