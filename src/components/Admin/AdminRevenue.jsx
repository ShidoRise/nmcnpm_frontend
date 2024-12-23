import React, { useState, useEffect } from "react";
import { getAllOrders } from "../API/ordersAPI";
import { format } from "date-fns";
import "./AdminRevenue.css";

const AdminRevenue = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });
  const [stats, setStats] = useState({
    totalRevenue: 0,
    orderCount: 0,
    averageOrder: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        const completedOrders = response.filter(
          (order) => order.status === "COMPLETED"
        );
        setOrders(completedOrders);
        calculateStats(completedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateStats = (filteredOrders) => {
    const relevantOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.createAt);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59);
      return orderDate >= startDate && orderDate <= endDate;
    });

    const totalRevenue = relevantOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const orderCount = relevantOrders.length;
    const averageOrder = orderCount ? totalRevenue / orderCount : 0;

    setStats({ totalRevenue, orderCount, averageOrder });
  };

  if (loading) {
    return <div className="admin-revenue__loading">Loading...</div>;
  }

  return (
    <div className="admin-revenue">
      <div className="admin-revenue__header">
        <h2>Revenue Report</h2>
        <div className="admin-revenue__date-picker">
          <div className="date-input">
            <label>Start Date:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => {
                setDateRange((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }));
                calculateStats(orders);
              }}
            />
          </div>
          <div className="date-input">
            <label>End Date:</label>
            <input
              type="date"
              value={dateRange.endDate}
              min={dateRange.startDate}
              onChange={(e) => {
                setDateRange((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }));
                calculateStats(orders);
              }}
            />
          </div>
        </div>
      </div>

      <div className="admin-revenue__stats">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Orders Completed</h3>
          <p className="stat-value">{stats.orderCount}</p>
        </div>
        <div className="stat-card">
          <h3>Average Order Value</h3>
          <p className="stat-value">${stats.averageOrder.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;
