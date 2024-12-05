import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "./Features/cartSlice";
import "./CartMenu.css";
import { ButtonMenu } from "../ProductsMenu/ButtonMenu/ButtonMenu";
//   các tính năng của giỏ hàng
const CartMenu = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  // các nút thao tác với hàng hóa
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isLoggedIn) {
    return (
      <div className="cartmenu-container">
        <div className="cartmenu-login-prompt">
          <h2>Please Login to View Cart</h2>
          <p>You need to be logged in to access your shopping cart</p>
          <Link to="/sign-up" className="login-button">
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cartmenu-container">
      <h2>Your Cart</h2>
      {/* kiểm tra giỏ hàng có trống không */}
      {cart.cartItems.length === 0 ? (
        <div className="cartmenu-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/products">
              <FaArrowAltCircleLeft />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        // trạng thái giỏ hàng khi đã thêm hàng
        <div>
          <div className="cartmenu-title">
            <h3 className="cartmenu-product">Product</h3>
            <h3 className="cartmenu-price">Price</h3>
            <h3 className="cartmenu-quantity">Quantity</h3>
            <h3 className="cartmenu-total">Total</h3>
          </div>
          <div className="cartmenu-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cartmenu-item" key={cartItem.id}>
                <div className="cartmenu-productitem">
                  <img src={cartItem.image} alt={cartItem.title} />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cartmenu-product-price">${cartItem.price}</div>
                <div className="cartmenu-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    {" "}
                    <FaMinusSquare />
                  </button>
                  <div className="cartmenu-count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleAddToCart(cartItem)}>
                    <FaPlusSquare />
                  </button>
                </div>
                <div className="cartmenu-product-totalprice">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cartmenu-summary">
            <button
              className="cartmenu-clearcart"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className="cartmenu-checkout">
              <div className="cartmenu-subtotal">
                <span>Subtotal</span>
                <span className="cartmenu-amount">${cart.cartTotalAmount}</span>
              </div>
              {/* Chuyển sang thanh toán */}
              <p>Continue shopping or checkout here </p>
              <ButtonMenu to="/confirm">Confirm and Pay</ButtonMenu>
              <Link to="/products">
                <FaArrowAltCircleLeft />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartMenu;
