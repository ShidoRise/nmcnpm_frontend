import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button/Button";
import "./Navbar.css";
import logowithtext from "../../assets/images/logowithtext.PNG";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả lập trạng thái đăng nhập
  const [dropdown, setDropdown] = useState(false); // Quản lý menu dropdown

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleDropdown = () => setDropdown(!dropdown); // Toggle dropdown menu

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdown(false);
  };

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
                to={isLoggedIn ? "/dashboard" : "/"}
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
              <li className="nav-item dropdown">
                <div
                  className="nav-links dropdown-toggle"
                  onClick={toggleDropdown}
                >
                  Account
                </div>
                {dropdown && (
                  <div className="dropdown-menu">
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
                )}
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
          {button && !isLoggedIn && (
            <Button buttonStyle="btn-outline">SIGN UP</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
