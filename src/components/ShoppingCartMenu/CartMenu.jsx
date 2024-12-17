import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchCart,
  updateCart,
  getTotals,
  updateCartToBackend,
} from "./Features/cartSlice";
import { getProductById } from "../API/productsAPI";
import { FaEdit, FaSave, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import "./CartMenu.css";

const CartMenu = () => {
  const { cartItems, cartTotalAmount, isLoading } = useSelector(
    (state) => state.cart
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editableItems, setEditableItems] = useState([]);
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();

  // Fetch cart data
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Update editable items when cart changes
  useEffect(() => {
    setEditableItems(cartItems);
  }, [cartItems]);

  // Fetch product details for each cart item
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

  const handleQuantityChange = (productId, change) => {
    setEditableItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setEditableItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity: 0 } : item
      )
    );
  };

  const handleSaveChanges = async () => {
    try {
      // Update local state first
      await dispatch(updateCart(editableItems));
      await dispatch(getTotals());

      // Update backend and wait for completion
      const result = await dispatch(updateCartToBackend()).unwrap();

      if (result) {
        setIsEditing(false);
        toast.success("Cart updated successfully!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to update cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleClearCart = async () => {
    try {
      const clearedItems = editableItems.map((item) => ({
        ...item,
        quantity: 0,
      }));

      await dispatch(updateCart(clearedItems));
      await dispatch(getTotals());
      await dispatch(updateCartToBackend()).unwrap();

      toast.success("Cart cleared successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to clear cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const visibleItems = editableItems.filter((item) => item.quantity > 0);

  if (isLoading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-header">
        <h2>Shopping Cart</h2>
        {!isEditing ? (
          <button
            className="shopping-cart-edit"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit Cart
          </button>
        ) : (
          <button className="shopping-cart-save" onClick={handleSaveChanges}>
            <FaSave /> Save Changes
          </button>
        )}
      </div>

      {!cartItems?.length ? (
        <div className="shopping-cart-empty">
          <p>Your cart is currently empty</p>
          <Link to="/products" className="shopping-cart-link">
            ← Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="shopping-cart-items">
            {visibleItems.map((item) => (
              <div key={item.productId} className="shopping-cart-item">
                <div className="shopping-cart-info">
                  <div className="shopping-cart-image">
                    <img
                      src={products[item.productId]?.image}
                      alt={products[item.productId]?.title}
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                  <div className="shopping-cart-details">
                    <h3>{products[item.productId]?.title}</h3>
                    <p className="shopping-cart-price">${item.price}</p>
                  </div>
                </div>

                <div className="shopping-cart-actions">
                  {isEditing ? (
                    <>
                      <div className="shopping-cart-quantity">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, -1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        className="shopping-cart-remove"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <div className="shopping-cart-quantity-display">
                      Quantity: {item.quantity}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="shopping-cart-summary">
            <div className="shopping-cart-subtotal">
              <div className="shopping-cart-summary-header">
                <button
                  className="shopping-cart-clear"
                  onClick={handleClearCart}
                >
                  Clear All Items
                </button>
                <div className="shopping-cart-total-row">
                  <span>Subtotal</span>
                  <span>${cartTotalAmount}</span>
                </div>
              </div>
              <Link to="/confirm" className="shopping-cart-checkout">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="shopping-cart-continue">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartMenu;
