// Login.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFail } from "./authSlice";
import "./Login.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserCart } from "../API/cartAPI";
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
        await getUserCart(userData.userId);
      } catch (cartError) {
        console.error("Failed to fetch cart:", cartError);
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
