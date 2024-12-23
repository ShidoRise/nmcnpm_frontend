import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.map((product) => ({
      id: product.productId,
      title: product.name,
      price: product.price.toFixed(2),
      image: product.imageUrl,
      description: product.description,
      category: product.category,
      isActive: product.isActive,
    }));
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch products");
  }
};

export const getProductById = async (id) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    const product = response.data;

    return {
      id: product.productId,
      title: product.name,
      price: product.price.toFixed(2),
      image: product.imageUrl,
      description: product.description,
      category: product.category,
    };
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error(err.response?.data?.message || "Failed to fetch product");
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/products/${productId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete product");
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/${productId}`,
      productData,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update product");
  }
};

export const updateProductStatus = async (productId, isActive) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/${productId}`,
      { isActive },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to update product status"
    );
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create product");
  }
};
