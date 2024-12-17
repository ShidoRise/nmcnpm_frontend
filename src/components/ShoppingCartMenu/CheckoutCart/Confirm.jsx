import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getTotals } from "../Features/cartSlice";
import { getProductById } from "../../API/productsAPI";
import { toast } from "react-toastify";
import "./Confirm.css";

const Confirm = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productDetails = {};
        for (const item of cartItems) {
          const product = await getProductById(item.productId);
          productDetails[item.productId] = product;
        }
        setProducts(productDetails);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Failed to load product details");
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  const handleProceedToPayment = () => {
    navigate("/paymoney");
  };

  if (!cartItems?.length) {
    return (
      <div className="confirm-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="confirm-back">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="confirm-container">
      <div className="confirm-header">
        <h2>Order Confirmation</h2>
        <p>Please review your order before proceeding to payment</p>
      </div>

      <div className="confirm-content">
        <div className="confirm-items-wrapper">
          <div className="confirm-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="confirm-item">
                <div className="confirm-item-image">
                  <img
                    src={products[item.productId]?.image}
                    alt={products[item.productId]?.title}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
                <div className="confirm-item-details">
                  <h3>{products[item.productId]?.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="confirm-footer">
          <div className="confirm-summary">
            <h3>Order Summary</h3>
            <div className="confirm-total">
              <span>Total Amount:</span>
              <span>${cartTotalAmount}</span>
            </div>
          </div>

          <div className="confirm-actions">
            <Link to="/shoppingcart" className="confirm-back-btn">
              <FaArrowLeft /> Back to Cart
            </Link>
            <button
              onClick={handleProceedToPayment}
              className="confirm-proceed-btn"
            >
              Proceed to Payment <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
