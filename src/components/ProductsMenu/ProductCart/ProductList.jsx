import React from "react";

const ProductList = ({ addToCart }) => {
  const products = [
    { id: 1, name: "Sản phẩm 1", price: 100 },
    { id: 2, name: "Sản phẩm 2", price: 200 },
    { id: 3, name: "Sản phẩm 3", price: 300 },
  ];

  return (
    <div style={{ width: "70%" }}>
      <h2>Danh sách sản phẩm</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
            <h3>{product.name}</h3>
            <p>Giá: {product.price} VND</p>
            <button onClick={addToCart}>Mua sản phẩm</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
