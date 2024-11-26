import Category from "./Category/Category";
import Spicy from "./Spicy/Spicy";
import Price from "./Price/Price";
import { FaShoppingCart } from "react-icons/fa";
import './ProductSidebar.css';

function ProductSidebar ({handleChange}) {
    return (
        <>
            <section className="sidebar">
                <div className="sidebar-logo-container">
                    <h2><FaShoppingCart /></h2>
                </div>
                <Category handleChange={handleChange}/>
                <Spicy handleChange={handleChange}/>
                <Price handleChange={handleChange}/>
            </section>
        </>
    );
}

export default ProductSidebar;