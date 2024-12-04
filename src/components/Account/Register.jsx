import React, { useRef, useState } from "react";
import { registerUser } from "../API/api";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const username = useRef("");
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const phoneNumber = useRef("");
  const birthDate = useRef("");
  const gender = useRef("");
  const address = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$])[0-9a-zA-Z!@#$]+$/;
  const phoneRegex = /\d{10}/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const data = await registerUser({
        username: username.current.value,
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        phoneNumber: phoneNumber.current.value,
        birthDate: birthDate.current.value,
        gender: gender.current.value,
        address: address.current.value,
      });
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/sign-up"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit}>
        <div className="register__title">Register</div>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={username}
          placeholder="Enter username"
          required
        />

        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          ref={name}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          ref={email}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          ref={phoneNumber}
          placeholder="Enter 10-digit phone number"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          ref={password}
          placeholder="Enter password"
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPassword}
          placeholder="Confirm your password"
          required
        />

        <label htmlFor="birthDate">Birth Date:</label>
        <input type="date" id="birthDate" ref={birthDate} />

        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={gender}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="address">Address:</label>
        <textarea id="address" ref={address} placeholder="Enter your address" />

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button className="register__button" type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "REGISTER"}
        </button>

        <Link className="register__account" to="/sign-up">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
