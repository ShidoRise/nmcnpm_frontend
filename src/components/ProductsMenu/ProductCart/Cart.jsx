import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BsCartCheck } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { addToCart } from '../../ShoppingCartMenu/Features/cartSlice';
import './Cart.css';

const Cart = ({ product }) => {
    const { cartTotalQuantity } = useSelector((state) => state.cart);  // Lấy số lượng giỏ hàng từ Redux
    const dispatch = useDispatch();
    const [isCartUpdated, setIsCartUpdated] = useState(false);

    const handleAddToCart = (product) => {
      if (!product || !product.id) {
        return;
    }
        dispatch(addToCart(product));
        // khi nhấn vào addtocart thì cartcount tăng
    };

    useEffect(() => {
        if (cartTotalQuantity > 0) {
            setIsCartUpdated(true);
            const timer = setTimeout(() => {
                setIsCartUpdated(false);  // Reset hiệu ứng sau 500ms
            }, 500);
            return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount hoặc effect thay đổi
        }
    }, [cartTotalQuantity]);

    return (
        <div className={`cart-container ${isCartUpdated ? 'cart-updated' : ''}`}>
            <span className="cart-count">{cartTotalQuantity}</span>  {/* Hiển thị số lượng giỏ hàng */}
            <Link
                className="btns-cart"
                to="/shoppingcart"
                onClick={() => handleAddToCart(product)}  // Thêm sản phẩm vào giỏ hàng khi nhấn
            >
                {cartTotalQuantity > 0 ? <BsCartCheckFill /> : <BsCartCheck />}
            </Link>
        </div>
    );
};

export default Cart;
