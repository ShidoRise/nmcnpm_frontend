import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import "./index.css";
import App from "./App";

import authReducer from "./components/Account/authSlice";
import cartReducer from "./components/ShoppingCartMenu/Features/cartSlice";
import productsReducer from "./components/ShoppingCartMenu/Features/productsSlice";
import voucherReducer from "./components/ShoppingCartMenu/Features/VoucherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    vouchers: voucherReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
