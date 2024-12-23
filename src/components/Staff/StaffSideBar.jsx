import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import { logout } from "../Account/authSlice";
import { toast } from "react-toastify";
import "./StaffSideBar.css";

const StaffSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully", {
      position: "bottom-right",
    });
    navigate("/");
  };

  return (
    <div className="staff-sidebar">
      <div className="staff-sidebar__header">
        <h2>Staff Dashboard</h2>
      </div>
      <nav className="staff-sidebar__nav">
        <a href="/staff/orders" className="staff-sidebar__nav-item">
          <FaClipboardList /> Orders Management
        </a>
      </nav>
      <div className="staff-sidebar__footer">
        <button onClick={handleLogout} className="staff-sidebar__logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default StaffSideBar;
