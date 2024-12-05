import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Products from "./pages/Products";
import Voucher from "./pages/Voucher";
import SignUp from "./pages/SignUp";
import Register from "./components/Account/Register";
import ProductDetail from "./components/ProductsMenu/Details/ProductDetail";
import PayMoney from "./components/ShoppingCartMenu/CheckoutCart/PayMoney";
import Confirm from "./components/ShoppingCartMenu/CheckoutCart/Confirm";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/payment" element={<PayMoney />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </>
  );
}

export default App;
