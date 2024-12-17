// Login.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFail } from "./authSlice";
import { store } from "../../index"; // Adjust the path as necessary
import "./Login.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchCart,
  getTotals,
  updateCartToBackend,
} from "../ShoppingCartMenu/Features/cartSlice";
import { loginUser, getUserProfile } from "../API/accountApi";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await loginUser({
        username: username.current.value,
        password: password.current.value,
      });
      const profileData = await getUserProfile();

      dispatch(loginSuccess({ ...userData, ...profileData }));

      try {
        console.log("2. After login, dispatching fetchCart");
        const cartResult = await dispatch(fetchCart()).unwrap();
        console.log("Cart fetch result:", cartResult);
        // Get current cart state
        const beforeState = store.getState().cart;
        console.log("Cart state before update:", beforeState.cartItems);

        if (cartResult.Products && cartResult.Products.length > 0) {
          await dispatch(getTotals());
          await dispatch(updateCartToBackend()).unwrap();
        }

        const afterState = store.getState().cart;
        console.log("Cart state after update:", afterState.cartItems);
        console.log(
          "Cart total amount after update:",
          afterState.cartTotalAmount
        );
      } catch (cartError) {
        console.error("Failed to fetch cart:", cartError);
        toast.error("Failed to sync cart with server", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }

      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 2000,
      });

      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.message));

      toast.error("Invalid username or password", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__container">
      <form onSubmit={handleSubmit}>
        <div className="login--title">Login</div>

        <label className="login-user" htmlFor="username">
          Username:{" "}
        </label>
        <input
          className="login-inputuser"
          type="text"
          id="username"
          ref={username}
          placeholder="Enter your username or email"
          required
        />

        <label className="login-pass" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className="login-inputpass"
          type="password"
          id="password"
          ref={password}
          placeholder="Enter your password to continue"
          required
        />

        <button className="input--button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>

        <Link className="login__account" to="/register">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
