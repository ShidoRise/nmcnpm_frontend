import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import RatingSummary from "./RatingSumary";
import "./Reviews.css";

const Reviews = ({ productId, reviews, setReviews, isLoading }) => {
  const [editingReview, setEditingReview] = useState(null);

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  return (
    <div className="reviews-container">
      <RatingSummary reviews={reviews} />
      <ReviewForm
        productId={productId}
        onReviewAdded={(updatedReview) => {
          if (editingReview) {
            setReviews(
              reviews.map((r) =>
                r.reviewId === updatedReview.reviewId ? updatedReview : r
              )
            );
            setEditingReview(null);
          } else {
            setReviews([...reviews, updatedReview]);
          }
        }}
        existingReview={editingReview}
      />
      <ReviewList
        reviews={reviews}
        setReviews={setReviews}
        onEditReview={handleEditReview}
      />
    </div>
  );
};

export default Reviews;
