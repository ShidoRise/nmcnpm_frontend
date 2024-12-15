import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, {
  productsFetch,
} from "./components/ShoppingCartMenu/Features/productsSlice";
import cartReducer, {
  getTotals,
} from "./components/ShoppingCartMenu/Features/cartSlice";
import voucherReducer from "./components/ShoppingCartMenu/Features/VoucherSlice";
import authReducer from "./components/Account/authSlice";

// dùng redux lấy nối data
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    vouchers: voucherReducer,
  },
});
store.dispatch(productsFetch);
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
