// node (path to run)
// Ex: node D:/REACT/nmcnpm_frontend/src/scripts/initializeDb.js

const axios = require("axios");
const {
  initialProducts,
} = require("../components/ProductsMenu/Data/productsData");

const API_BASE_URL = "http://localhost:5000";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const transformProductData = (product) => ({
  name: product.title,
  price: parseFloat(product.price),
  description: product.description,
  imageUrl: product.image,
  category: product.category,
  isActive: true,
});

const createSingleProduct = async (product, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(`${API_BASE_URL}/products/`, product);
      return response.data;
    } catch (err) {
      if (i === retries - 1) throw err;
      await delay(1000 * (i + 1)); // Exponential backoff
    }
  }
};

const initializeDb = async () => {
  try {
    console.log("Starting products initialization...");
    const transformedProducts = initialProducts.map(transformProductData);

    console.log(
      `Processing ${transformedProducts.length} products sequentially...`
    );

    const results = [];
    const errors = [];

    for (let i = 0; i < transformedProducts.length; i++) {
      const product = transformedProducts[i];
      try {
        console.log(
          `Creating product ${i + 1}/${transformedProducts.length}: ${
            product.name
          }`
        );
        const result = await createSingleProduct(product);
        results.push(result);
        await delay(500); // Rate limiting
      } catch (err) {
        console.error(
          `Failed to create product ${product.name}:`,
          err.response?.data || err.message
        );
        errors.push({ product, error: err.message });
      }
    }

    console.log("\nInitialization Complete:");
    console.log(
      `Successfully created ${results.length}/${transformedProducts.length} products`
    );

    if (errors.length > 0) {
      console.log("\nFailed products:");
      errors.forEach(({ product, error }) => {
        console.log(`- ${product.name}: ${error}`);
      });
    }
  } catch (err) {
    console.error("Fatal error:", err.message);
    process.exit(1);
  }
};

initializeDb();
