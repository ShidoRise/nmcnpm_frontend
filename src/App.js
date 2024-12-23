import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/UI/Navbar";
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
import AdminUsers from "./components/Admin/AdminUsers";

import StaffDashboard from "./pages/StaffDashBoard";
import StaffOrders from "./components/Staff/StaffOrders";
import AdminRevenue from "./components/Admin/AdminRevenue";

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="revenue" element={<AdminRevenue />} />
        </Route>

        {/* Staff Routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["STAFF"]}>
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
