import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUser } from "../API/ordersAPI";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }
      try {
        const response = await getOrdersByUser();
        setOrders(response);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="order-list-empty">
        <h2>Please Login</h2>
        <p>You need to be logged in to view your orders.</p>
        <Link to="/sign-up" className="login-btn">
          Login to Continue
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="order-loading">Loading orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="order-list-empty">
        <h2>No Orders Yet</h2>
        <p>Looks like you haven't placed any orders yet.</p>
        <Link to="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <h2>My Orders</h2>
      <div className="orders">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.orderId}</h3>
                <p className="order-date">
                  {format(new Date(order.createAt), "PPP")}
                </p>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="order-details">
              <div className="shipping-info">
                <p>
                  <strong>Shipping Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Shipping Method:</strong> {order.shippingMethod}
                </p>
                <p>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
              </div>

              <div className="order-items-list">
                {order.Products.map((product) => (
                  <div key={product.productId} className="order-item">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h4>{product.name}</h4>
                      <div className="order-item-info">
                        <p>Quantity: {product.OrderProduct.quantity}</p>
                        <p>Price: ${product.OrderProduct.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <h4>Total Amount: ${order.totalPrice}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
