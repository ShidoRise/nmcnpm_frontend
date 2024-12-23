import { Outlet } from "react-router-dom";
import StaffSideBar from "../components/Staff/StaffSideBar";

const StaffDashboard = () => {
  return (
    <div className="staff-layout">
      <StaffSideBar />
      <main className="staff-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffDashboard;
