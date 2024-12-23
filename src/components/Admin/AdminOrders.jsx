import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrder, deleteOrder } from "../API/ordersAPI";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const ORDER_STATUSES = {
    PENDING: "Pending",
    CONFIRMED: "Waiting for Transfer Confirmation",
    PREPARING: "Preparing",
    DELIVERING: "Delivering",
    COMPLETED: "Delivered Successfully",
    CANCELLED: "Cancelled",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response);
      } catch (error) {
        toast.error("Failed to fetch orders", {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
        toast.success("Order deleted successfully", {
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Failed to delete order", {
          position: "bottom-right",
        });
      }
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to update order status", {
        position: "bottom-right",
        autoClose: 2000,
      });
      console.error(error);
    }
  };

  if (loading) {
    return <div className="staff-orders__loading">Loading orders...</div>;
  }

  return (
    <div className="staff-orders">
      <h2>Orders Management</h2>
      <div className="staff-orders__table-container">
        <table className="staff-orders__table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Shipping</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>
                <td>{format(new Date(order.createAt), "dd/MM/yyyy HH:mm")}</td>
                <td>
                  <span
                    className={`staff-orders__status status-${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.address}</td>
                <td>{order.shippingMethod}</td>
                <td>{order.paymentMethod.toUpperCase()}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order.orderId, e.target.value)
                    }
                    className="staff-orders__status-select"
                  >
                    {Object.entries(ORDER_STATUSES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="staff-orders__delete-btn"
                    title="Delete Order"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
