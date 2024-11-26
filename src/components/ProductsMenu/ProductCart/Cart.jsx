import React from "react";
import './ProductCart.css';
import { BsCartCheck } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import {Button} from '../../UI/Button/Button';
const Cart = ({ cartCount }) => {
  return (
    <div className="cart-container">
      <p className="cart-count"> <strong>{cartCount}</strong></p>
      <Button className='btns' buttonStyle='btn--food' buttonSize='btn--large' to='/shoppingcart'>
      {cartCount ? <BsCartCheck /> : <BsCartCheckFill />}
      </Button>
    </div>
  );
};

export default Cart;
