import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const username = useRef();
  const password = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(
                'http://localhost:5000/auth/login',
                { username: username.current.value, password: password.current.value},
                { widthCredentials: true }
            );

            if (res.status === 200) {
                alert('Login successful');
                navigate('/dashboard');
            }
        } catch(error) {
            alert('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.get('http://localhost:5000/users/profile', { withCredentials: true });
        setUser(res.data);
        } catch(error) {
            console.error('Failed to get user profile:', error);
        }
    }
    const handleLogout = async (e) => {
        e.preventDefault();
        await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
    }
    const getAllUser = async (e) => {
        e.preventDefault();
        const res = await axios.get('http://localhost:5000/users', { withCredentials: true });
        setAllUser(res.data);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.get('http://localhost:5000/auth/login', { withCredentials: true });
        setUser(res.data);
    }


    return (
        <div className="login__container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="login--title">Login</div>
                <label className="login-user" for="username" >Username: </label>
                <input className="login-inputuser" type="text" id="username" ref={username} placeholder="Enter your username or email" />
                <br />
                <label className="login-pass" for="password" >Password: </label>
                <input className="login-inputpass" type="password" id="password" ref={password} placeholder="Enter your password to continue" />
                <br/>
                <button className="input--button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'LOGIN'}
                </button>
                <Link className="login__account" to="/register">Don't have an account?</Link>
            </form>


        </div>
    );
  }

export default Login;
