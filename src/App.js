import "./App.css";
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Products from "./pages/Products";
import Voucher from "./pages/Voucher";
import SignUp from "./pages/SignUp";
import Register from "./components/Account/Register";
import Swipercarousel from "./components/UI/Swiperedit/Swipercarousel";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./components/ProductsMenu/Details/ProductDetail";
import PayMoney from "./components/ShoppingCartMenu/CheckoutCart/PayMoney";
import Confirm from "./components/ShoppingCartMenu/CheckoutCart/Confirm";
import Profile from "./components/Account/Profile";

function App() {
  // kiểm tra đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleStorageChange = () => {
      const userLoggedIn = localStorage.getItem("isLoggedIn");
      if (userLoggedIn === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <>
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/Swipercarousel" element={<Swipercarousel />} />
        <Route path="/paymoney" element={<PayMoney />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
