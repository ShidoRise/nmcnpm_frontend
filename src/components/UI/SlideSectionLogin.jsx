import React from 'react';
import { Button } from './Button/Button';
import './SlideSection.css';
import '../../App.css';
import { GiFullPizza } from "react-icons/gi";
import { FaCcAmazonPay } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import logountext from '../../assets/images/logountext.PNG';
import Swipercarousel from './Swiperedit/Swipercarousel';

// quảng bá đầu trang khi đã đăng nhập
function SlideSectionLogin () {
    return (
        <div className='hero-container'>
            <div className="hero-welcome">
                <h1 className="hero-welcome-title">Welcome to PizzWang <GiFullPizza/></h1>

            </div>
            <Swipercarousel/>

            <div className="hero-background">
                <img src={logountext} alt="background-inner"/>
            </div>
            <p class="hero-hello">What do you want to eat today?</p>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--food' buttonSize='btn--large' to='products'>
                BUY FOOD NOW <IoFastFoodSharp />
                </Button>

                <Button className='btns' buttonStyle='btn--food' buttonSize='btn--large' to='/shoppingcart'>
                PAY NOW <FaCcAmazonPay />
                </Button>
            </div>
        </div>
    );
}

export default SlideSectionLogin;