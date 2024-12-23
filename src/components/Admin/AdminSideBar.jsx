import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaUsers,
  FaBox,
  FaChartLine,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { logout } from "../Account/authSlice";
import "./AdminSideBar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully", {
      position: "bottom-right",
    });
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/users" className="nav-item">
          <FaUsers /> Users Management
        </NavLink>
        <NavLink to="/admin/products" className="nav-item">
          <FaBox /> Products Management
        </NavLink>
        <NavLink to="/admin/orders" className="nav-item">
          <FaClipboardList /> Orders Management
        </NavLink>
        <NavLink to="/admin/revenue" className="nav-item">
          <FaChartLine /> Revenue Statistics
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
