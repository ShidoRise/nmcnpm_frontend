import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/sign-up" replace />;
  }

  return children;
};

export default ProtectedRoute;
