import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getUserCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch cart");
  }
};

export const updateCartProducts = async (payload) => {
  try {
    console.log("Updating cart with:", payload);
    const response = await axios.patch(
      `${API_BASE_URL}/carts`,
      {
        products: payload.products,
        cartData: {
          totalPrice: payload.cartData.totalPrice,
        },
      },
      { withCredentials: true }
    );
    console.log("Cart updated:", response.data);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update cart");
  }
};
