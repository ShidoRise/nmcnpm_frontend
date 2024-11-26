import React from 'react';
import {Link} from 'react-router-dom'
import {BsFillBagHeartFill} from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
function ProductCard ({id, path, title, star, reviews, newPrice}) {
    return (
        <>
            <section className="card">
                    <img src={path} alt={title} className="card-img"/>
                    <div className="card-details">
                        <h3 className="card-title">{title}</h3>
                        <section className="card-reviews">
                            {star} {star}
                            <span className="total-reviews">4</span>
                        </section>
                        <section className="card-price">
                            <div clasName="price">
                                <del>$300</del> {newPrice}
                            </div>
                            <div className="bag">
                                <BsFillBagHeartFill className="bag-icons"/>
                            </div>
                        </section>
                    </div>
                </section>
        </>
    );
}

export default ProductCard;