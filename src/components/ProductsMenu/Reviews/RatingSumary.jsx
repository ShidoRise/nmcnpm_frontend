import React from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import './RatingSumary.css';

const RatingSummary = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return;
    }

    const calculateRatingDistribution = () => {
        const totalReviews = reviews.length;
        const ratingCount = Array(5).fill(0);

        reviews.forEach((review) => {
            ratingCount[review.rating - 1]++;
        });


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
                    <span>{index + 1} <FaStar />:</span>
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{
                                width: `${percentage}%`,
                                height: "10px",
                            }}
                            data-rating={index + 1}
                        ></div>
                    </div>
                    <span>{percentage}% ({ratingCount[index]} votes)</span>
                </div>
            ))}
        </div>
    );
};

export default RatingSummary;
