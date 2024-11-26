import {Button} from '../../UI/Button/Button';
import React, { useState} from 'react';
import './ProductCart.css';
import { BsCartCheck } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import ProductList from "./ProductList";
import Cart from "./Cart";

function ProductCart () {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => {
        setCartCount(cartCount + 1);
    };
    return (
        <div className="product-cart-container">
            <p className="product-cart-title">{cartCount ? <BsCartCheck /> : <BsCartCheckFill />}</p>
            <ProductList addToCart={addToCart}/>
            <Cart cartCount={cartCount} />

        </div>
    );
}

export default ProductCart;



