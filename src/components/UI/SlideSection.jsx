import React from 'react';
import { Button } from './Button/Button';
import './SlideSection.css';
import '../../App.css';
import { GiFullPizza } from "react-icons/gi";
import logountext from '../../assets/images/logountext.PNG';
import Swipercarousel from './Swiperedit/Swipercarousel';

function SlideSection () {
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
                <Button className='btns' buttonStyle='btn--food' buttonSize='btn--large'>
                    GET STARTED <i class="fa-solid fa-right-to-bracket"></i>
                </Button>

                <Button className='btns' buttonStyle='btn--food' buttonSize='btn--large' to='/products'>
                    TODAY's DELICIOUS FOOD <i class="fa-solid fa-pizza-slice"></i>
                </Button>
            </div>
        </div>
    );
}

export default SlideSection;