import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {  getTotals } from "../Features/cartSlice";
import { ButtonMenu } from '../../ProductsMenu/ButtonMenu/ButtonMenu';
import './Confirm.css'
//   các tính năng của giỏ hàng
const Confirm = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]);

    return (
        <div className="confirm-container">
            <h2>Confirm</h2>
            {/* kiểm tra giỏ hàng có trống không */}
            {cart.cartItems.length === 0 ? (
                <div className="confirm-empty">
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
                    <div className="confirm-title">
                        <h3 className="confirm-product">Product</h3>
                        <h3 className="confirm-price">Price</h3>
                        <h3 className="confirm-quantity">Quantity</h3>
                        <h3 className="confirm-total">Total</h3>
                    </div>
                    <div className="confirm-items">
                        {cart.cartItems?.map((cartItem) => (
                            <div className="confirm-item" key = {cartItem.id}>
                                <div className="confirm-productitem">
                                    <div>
                                        <h3>{cartItem.title}</h3>
                                    </div>
                                </div>
                                <div className="confirm-product-price">${cartItem.price}</div>
                                <div className="confirm-product-quantity">

                                    <div className="confirm-count">{cartItem.cartQuantity}</div>

                                </div>
                                <div className="confirm-product-totalprice">
                                    ${cartItem.price * cartItem.cartQuantity}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="confirm-summary">
                        <Link to="/shoppingcart">

                            <span className="back-cart">  <FaArrowAltCircleLeft /> Back to cart</span>
                        </Link>
                        <div className="confirm-checkout">
                            <div className="confirm-subtotal">
                                <span>Subtotal</span>
                                <span className="confirm-amount">${cart.cartTotalAmount}</span>
                            </div>
                            {/* Chuyển sang thanh toán */}
                            <ButtonMenu to="/paymon">Pay</ButtonMenu>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Confirm;