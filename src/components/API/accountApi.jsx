import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

axios.interceptors.request.use((request) => {
  console.log("Request:", request.method, request.url);
  console.log("Request Data:", request.data);
  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    return Promise.reject(error);
  }
);

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/`, user);
    console.log("Success Response:", response.data);
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    console.error("Registration Error Details:", {
      status: err.response?.status,
      data: err.response?.data,
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

export const anotherApiFunction = async () => {
  // Implementation for another API function
};
