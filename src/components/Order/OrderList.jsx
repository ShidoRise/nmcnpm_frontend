import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrdersByUser } from "../API/ordersAPI";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "./OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
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
  }, []);

  if (loading) {
    return <div className="order-loading">Loading orders...</div>;
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

              <div className="order-products">
                {order.Products.map((product) => (
                  <div key={product.productId} className="product-item">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <div className="product-info">
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
