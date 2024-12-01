import React from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import "./RatingSumary.css";
const RatingSummary = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews available</p>;
    }

    const calculateRatingDistribution = () => {
        const totalReviews = reviews.length;
        const ratingCount = Array(5).fill(0);

        reviews.forEach((review) => {
            ratingCount[review.rating - 1]++;
        });

        // Tính phần trăm dựa trên số lượt đánh giá cho từng mức sao
        const ratingPercentage = ratingCount.map((count) => ((count / totalReviews) * 100).toFixed(1));

        return { ratingCount, ratingPercentage };
    };

    const { ratingCount, ratingPercentage } = calculateRatingDistribution();
    const totalReviews = reviews.length;

    return (
        <div className="rating-summary-box">
            <h4>Rating Summary</h4>
            {ratingPercentage.map((percentage, index) => (
                <div key={index} className="rating-bar">
                    <span>{index} <FaStar />:</span>
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: "gold",
                                height: "10px",
                            }}
                        ></div>
                    </div>
                    {/* Hiển thị phần trăm và số lượt đánh giá */}
                    <span>{percentage}% ({ratingCount[index]} votes)</span>
                </div>
            ))}
        </div>
    );
};

export default RatingSummary;
