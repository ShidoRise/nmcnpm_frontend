import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ShoppingCart from "./pages/ShoppingCart";
import Voucher from "./pages/Voucher";
import SignUp from "./pages/SignUp";
import Register from "./components/Account/Register";
import ProductDetail from "./components/ProductsMenu/Details/ProductDetail";
import PayMoney from "./components/ShoppingCartMenu/CheckoutCart/PayMoney";
import Confirm from "./components/ShoppingCartMenu/CheckoutCart/Confirm";
import ProfilePage from "./pages/ProfilePage";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashBoard";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminUsers from "./components/Admin/AdminUsers";

import StaffDashboard from "./pages/StaffDashboard";
import StaffOrders from "./components/Staff/StaffOrders";

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  const { user } = useSelector((state) => state.auth);
  const isAdminOrStaff = user?.role === "ADMIN" || user?.role === "STAFF";

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Staff Routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="orders" element={<StaffOrders />} />
        </Route>

        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/shoppingcart" element={<ShoppingCart />} />
                <Route path="/voucher" element={<Voucher />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/paymoney" element={<PayMoney />} />
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
