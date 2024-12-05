import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/`, user);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to register user");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch profile");
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/me`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update profile");
  }
};
