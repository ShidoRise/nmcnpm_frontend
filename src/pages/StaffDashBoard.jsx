import { Outlet } from "react-router-dom";

const StaffDashboard = () => {
  return (
    <div className="staff-layout">
      <main className="staff-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffDashboard;
