import React from "react";
import { FaStar } from "react-icons/fa";
import "./RatingSumary.css";

const RatingSummary = ({ reviews }) => {
  if (!reviews?.length) return null;

  const ratingCounts = Array(5).fill(0);

  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const totalReviews = reviews.length;

  return (
    <div className="rating-summary">
      <h4>Rating Distribution ({totalReviews} reviews)</h4>
      <div className="rating-bars">
        {ratingCounts.map((count, index) => (
          <div key={index} className="rating-bar">
            <div className="rating-label">
              <span>{index + 1}</span>
              <FaStar className="star-icon" />
            </div>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${(count / totalReviews) * 100}%` }}
              />
            </div>
            <span className="count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
