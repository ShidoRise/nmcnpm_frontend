import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Register.css';



const Register = () => {
    const username = useRef("");
    const yourname = useRef("");
    const email = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password.current.value !== confirmPassword.current.value) {
            setError("Please enter a valid confirm password");
            return;
        }
        if(password.current.value.length < 6) {
            setError("Please enter a password of at least 6 characters");
            return;
        }
        if(!email.current.value.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        const user = {
            username: username.current.value,
            yourname: yourname.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/auth/register', user);
            console.log(res.data);
            setError("");
            username.current.value = "";
            yourname.current.value = "";
            email.current.value = "";
            password.current.value = "";
            confirmPassword.current.value = "";
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again!");
            setIsLoading(false);
        }
    };

    return (
        <div className="register__container">
            <form onSubmit={handleSubmit}>
                <div class="register__title">Register</div>
                {error && <div className="error">{error}</div>}
                <label className="register__inputlabel" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={username}
                    placeholder="Enter your username"
                    required
                />

                <label className="register__inputlabel" htmlFor="yourname">Your Name:</label>
                <input
                    type="text"
                    id="yourname"
                    ref={yourname}
                    placeholder="Enter your name"
                    required
                />

                <label className="register__inputlabel" htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={email}
                    placeholder="Enter your email"
                    required
                />

                <label className="register__inputlabel" htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    ref={password}
                    placeholder="Enter your password"
                    required
                />

                <label className="register__inputlabel" htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    ref={confirmPassword}
                    placeholder="Re-enter your password"
                    required
                />

                <button type="submit" className="register__button" disabled={isLoading}>
                    {isLoading ? "Registering..." : "REGISTER"}
                </button>
            </form>
        </div>
    );
};

export default Register;
