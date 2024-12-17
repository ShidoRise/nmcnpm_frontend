import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import "./Cart.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  useEffect(() => {
    if (cartTotalQuantity > 0) {
      setIsCartUpdated(true);
      const timer = setTimeout(() => {
        setIsCartUpdated(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cartTotalQuantity]);

  return (
    <div className={`cart-container ${isCartUpdated ? "cart-updated" : ""}`}>
      <Link to="/shoppingcart" className="cart-link">
        <BsCart4 className="cart-icon" />
        {cartTotalQuantity > 0 && (
          <span className="cart-badge">{cartTotalQuantity}</span>
        )}
      </Link>
    </div>
  );
};

export default Cart;
