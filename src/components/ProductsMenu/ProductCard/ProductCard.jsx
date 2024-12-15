import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <span className="price">${product.price}</span>
          <h3 className="title">{product.title}</h3>
          <p className="category">{product.category}</p>
        </div>
      </Link>

      <div className="product-actions">
        <Link to={`/product/${product.id}`} className="details-button">
          Details
        </Link>
        <button
          className="add-to-cart-button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
