import "./App.css";
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
function App() {
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
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Swipercarousel" element={<Swipercarousel />} />
      </Routes>
    </>
  );
}

export default App;
