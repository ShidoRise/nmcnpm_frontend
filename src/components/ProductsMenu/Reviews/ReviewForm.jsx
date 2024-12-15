import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createReview } from "../../API/reviewAPI";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ReviewForm.css";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setRating(0);
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setIsSubmitting(true);
      const newReview = await createReview({
        productId,
        rating,
        comment: comment.trim(),
      });

      onReviewAdded(newReview);
      resetForm();
      toast.success("Review submitted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>Write a Review</h4>

      <div className="rating-container">
        <label>Your Rating:</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`star-button ${star <= rating ? "active" : ""}`}
              onClick={() => setRating(star)}
              disabled={isSubmitting}
            >
              {star <= rating ? <FaStar /> : <FaRegStar />}
            </button>
          ))}
        </div>
      </div>

      <div className="comment-container">
        <label>Your Review:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Share your thoughts about this product..."
          disabled={isSubmitting}
          maxLength={500}
        />
        <small>{comment.length}/500</small>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={resetForm}
          disabled={isSubmitting || (!rating && !comment)}
          className="reset-button"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !rating || !comment.trim()}
          className="submit-button"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
