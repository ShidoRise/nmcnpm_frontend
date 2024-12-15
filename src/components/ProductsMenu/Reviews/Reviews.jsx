import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import RatingSummary from "./RatingSumary";
import "./Reviews.css";

const Reviews = ({ productId, reviews, setReviews, isLoading }) => {
  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="reviews-container">
      <RatingSummary reviews={reviews} />
      <ReviewForm
        productId={productId}
        onReviewAdded={(newReview) => setReviews([...reviews, newReview])}
      />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Reviews;
