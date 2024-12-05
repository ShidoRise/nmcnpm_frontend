import React, { useState, useCallback } from "react";
import { GiFullPizza } from "react-icons/gi";
import PropTypes from "prop-types";
import "./SlideSection.css";
import "../../App.css";
import logountext from "../../assets/images/logountext.PNG";
import Swipercarousel from "./Swiperedit/Swipercarousel";
import { FaCcAmazonPay } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { Button } from "./Button/Button.jsx";
import { useSelector } from "react-redux";

const SlideSection = ({ onGetStarted }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    setError("Failed to load image");
    console.error("Image loading error:", e);
  }, []);

  const handleGetStarted = useCallback(() => {
    if (onGetStarted) {
      onGetStarted();
    }
  }, [onGetStarted]);

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <section className="hero-container">
      <div className="hero-welcome">
        <h1 className="hero-welcome-title">
          Welcome to PizzWang <GiFullPizza className="pizza-icon" />
        </h1>
      </div>

      <Swipercarousel />

      <div className="hero-background">
        <img
          src={logountext}
          alt="PizzWang Logo"
          className={`background-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <h2 className="hero-hello">What do you want to eat today?</h2>

      <div className="hero-btns">
        {isLoggedIn ? (
          <div>
            <Button
              className="btns"
              buttonStyle="btn--food"
              buttonSize="btn--large"
              to="products"
            >
              BUY FOOD NOW <IoFastFoodSharp />
            </Button>

            <Button
              className="btns"
              buttonStyle="btn--food"
              buttonSize="btn--large"
              to="/shoppingcart"
            >
              PAY NOW <FaCcAmazonPay />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="btns"
              buttonStyle="btn--food"
              buttonSize="btn--large"
              onClick={handleGetStarted}
            >
              GET STARTED <i className="fa-solid fa-right-to-bracket" />
            </Button>

            <Button
              className="btns"
              buttonStyle="btn--food"
              buttonSize="btn--large"
              to="/products"
            >
              VIEW MENU <i className="fa-solid fa-pizza-slice" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

SlideSection.propTypes = {
  onGetStarted: PropTypes.func,
};

export default React.memo(SlideSection);
