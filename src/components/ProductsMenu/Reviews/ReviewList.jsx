import React from "react";
import { useSelector } from "react-redux";
import { deleteReview } from "../../API/reviewAPI";
import { toast } from "react-toastify";
import "./ReviewList.css";

const ReviewList = ({ reviews, setReviews }) => {
  const currentUser = useSelector((state) => state.auth.user);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );
      toast.success("Review deleted successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Failed to delete review", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  if (!Array.isArray(reviews)) {
    return <div>No reviews available</div>;
  }

  return (
    <div className="review-list-box">
      <h4>Customer Reviews ({reviews.length})</h4>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.reviewId} className="review-item">
            <div className="review-header">
              <div className="user-info">
                <strong>{review.User?.username || "Anonymous"}</strong>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {currentUser?.userId === review.userId && (
                <button
                  className="delete-review"
                  onClick={() => handleDeleteReview(review.reviewId)}
                >
                  ×
                </button>
              )}
            </div>
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  {i < review.rating ? "⭐" : "☆"}
                </span>
              ))}
            </div>
            <p className="review-comment">{review.review}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default ReviewList;
