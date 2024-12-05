import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getUserCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch cart");
  }
};

export const updateUserCart = async (userId, cartData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/cart/${userId}`,
      cartData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update cart");
  }
};
