// ProductCard.js
import React from "react";
import './ProductCard.css';
import {Link} from 'react-router-dom';
import { FaRegHandPointRight } from "react-icons/fa";
import ProductDetail from "../Details/ProductDetail";
const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="to-grid">
            <div className="listProduct-container">
            <div className="productcard-container">
                <div className="product-card-container">
                    <img src={product.image} alt={product.title} />
                    <div className="product-card-infor">
                        <span className="price"><del>{product.oldPrice}</del> ${product.price}</span>
                       <span className="review">{product.review}</span>

                    </div>
                    <h3 className="infor-title">{product.title}</h3>
                </div>

                <div className="product-card-details">
                    <ul>
                      <li>
                          <Link to={`/product/${product.id}`} className="details-card">Details</Link>
                     </li>

                       <li>
                         <button onClick={() => onAddToCart(product)}>Add to Cart</button>
                     </li>
                    </ul>

                </div>
            </div>

        </div>
        </div>
    );
};

export default ProductCard;
