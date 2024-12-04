import Carditem from "./Carditem";
import React from "react";
import "./Cards.css";
import new1 from "../../assets/images/new1.jpeg";
import new2 from "../../assets/images/new2.jpeg";
import new3 from "../../assets/images/new3.jpeg";

// thẻ quảng bá
function Cards() {
  return (
    <div className="cards">
      <h2 className="cards-intro">Our latest delicious dish for you!</h2>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <Carditem
              src={new1}
              text="Welcome Ramadan in a special way with our delicious pizza"
              label="Pizza Ramadan Mubarak"
              path="/product/60"
            />

            <Carditem
              src={new2}
              text="A hearty dish with fragrant grilled chicken, special sauce, fresh and crispy vegetables and soft and chewy crust"
              label="Chicken Tacos"
              path="/product/58"
            />

            <Carditem
              src={new3}
              text="Discover new flavors with this creative hamburger, combining soft crust and juicy grilled meat"
              label="Chezzy Burger"
              path="/product/62"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
