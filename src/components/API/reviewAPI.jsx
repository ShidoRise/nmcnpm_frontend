import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create review");
  }
};

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/reviews/product/${productId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch reviews");
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/reviews/${reviewId}`,
      reviewData,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update review");
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete review");
  }
};
