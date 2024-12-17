import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Account/authSlice";
import { Button } from "./Button/Button";
import "./Navbar.css";
import logowithtext from "../../assets/images/logowithtext.PNG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleDropdown = () => setDropdown(!dropdown);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdown(false);
    navigate("/");
    closeMobileMenu();

    toast.success("Logged out successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const onMouseEnter = () => setDropdown(true);
  const onMouseLeave = () => setDropdown(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-container__tabs">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={logowithtext} alt="Logo" className="navbar-logo__img" />
            </Link>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to={"/"}
                className="nav-links"
                activeClassName="active"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className="nav-links"
                activeClassName="active"
                onClick={closeMobileMenu}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/shoppingcart"
                className="nav-links"
                activeClassName="active"
                onClick={closeMobileMenu}
              >
                Shopping Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/voucher"
                className="nav-links"
                activeClassName="active"
                onClick={closeMobileMenu}
              >
                Voucher
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li
                className="nav-item dropdown"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <div
                  className="nav-links dropdown-toggle"
                  onClick={toggleDropdown}
                >
                  Hello,
                  <span className="username-truncate">
                    {user?.name || "User"}
                  </span>
                </div>
                <div className={`dropdown-menu ${dropdown ? "show" : ""}`}>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <div className="dropdown-item" onClick={handleLogout}>
                    Log Out
                  </div>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          {button && !isLoggedIn && (
            <Button buttonStyle="btn-outline">LOGIN</Button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
