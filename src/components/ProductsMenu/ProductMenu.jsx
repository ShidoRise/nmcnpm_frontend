import { useState } from 'react';
import './ProductMenu.css';
import Navigation from './Navigation/Navigation';
import Recommended from './Recommended/Recommended';
import Productin from './Product/Productin';
import ProductSidebar from './ProductSidebar/ProductSidebar';
import ProductCard from './ProductCard';
import products from './data';
import Cart from './ProductCart/Cart';
function ProductMenu () {
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [query, setQuery] = useState("");
    const handleInputChange = event => {
        setQuery(event.target.value)
    };
    const filteredItems = products.filter((product) =>
        product.title?.toLocaleLowerCase().indexOf(query?.toLocaleLowerCase()) !== -1
    );

    const handleChange = event => {
        setSelectedCategory(event.target.value)
    };

    const handleClick = event => {
        setSelectedCategory(event.target.value)
    }
    function filteredData(products, selected, query) {
        let filteredProducts = products
        if(query) {
            filteredProducts = filteredItems
        }
        if(selected) {
            filteredProducts = filteredProducts.filter(
                ({category, newPrice, title }) =>
                    category === selected ||
                newPrice === selected ||
                title === selected
            );
        }
        return filteredProducts.map(({id, path, title, star, reviews, newPrice}) => (
            <ProductCard
                key={id || title}
                path={path}
                title={title}
                star={star}
                reviews={reviews}
                newPrice={newPrice}
            />
        ));

    }

    const result = filteredData(products, selectedCategory, query);
    return (
        <>
            <ProductSidebar handleChange={handleChange}/>
            <Navigation query={query} handleInputChange={handleInputChange}/>
            <Recommended handleClick={handleClick}/>
            <Productin result={result}/>
            <Cart />
        </>

    );
}

export default ProductMenu;