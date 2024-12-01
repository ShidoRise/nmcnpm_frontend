import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../ShoppingCartMenu/Features/ProductsAPI";
import { addToCart } from "../ShoppingCartMenu/Features/cartSlice";
import { FilterSearch } from "./FilterProducts/Search/FilterSearch";
import { FilterCategory } from "./FilterProducts/Category/FilterCategory";
import SearchBar from "./FilterProducts/Search/SearchBar";
import CategoryFilter from "./FilterProducts/Category/CategoryFilter";
import ProductCard from "./ProductCard/ProductCard";
import Cart from "./ProductCart/Cart";
import "./ProductMenu.css";
import PropertyBar from "./FilterProducts/Property/PropertyBar";
import PriceBar from "./FilterProducts/Price/PriceBar";
import { FilterProperty } from "./FilterProducts/Property/FilterProperty";
import { FilterPrice } from "./FilterProducts/Price/FilterPrice";

const ProductMenu = () => {
    const { data, error, isLoading } = useGetAllProductsQuery();
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedProperty, setSelectedProperty] = useState("all");
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [showSearch, setShowSearch] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const productsPerPage = 6;

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const filteredProducts = useMemo(() => {
        const filteredBySearch = FilterSearch(data, searchTerm);
        const filteredByCategory = FilterCategory(filteredBySearch, selectedCategory);
        const filteredByProperty = filteredByCategory.filter(product =>
            selectedProperty === "all" || product.property === selectedProperty
        );
        return FilterPrice(filteredByProperty, selectedPriceRange);
    }, [data, searchTerm, selectedCategory, selectedProperty, selectedPriceRange]);

    const categories = [...new Set(data?.map((product) => product.category))];
    const properties = [...new Set(data?.map((product) => product.property))];

    const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
    const offset = currentPage * productsPerPage;
    const currentProducts = filteredProducts?.slice(offset, offset + productsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        setIsLoadingPage(true);
        setTimeout(() => setIsLoadingPage(false), 500);
    };

    useEffect(() => {
        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShowSearch(currentScroll <= lastScroll);
            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div class="product-aboutcard-container">
                <div class="product-card-firstfilter">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                    <PriceBar
                        priceRanges={[
                            { value: "<3", label: "Under $3" },
                            { value: "3-10", label: "$3 - $10" },
                            { value: "10-20", label: "$10 - $20" },
                            { value: ">=20", label: "$20 and above" },
                        ]}
                        selectedPriceRange={selectedPriceRange}
                        onPriceChange={setSelectedPriceRange}
                    />
                </div>

                <div class="product-card-main">
                    <div class="card-search-filter">
                        {showSearch && (
                            <div className="search-bar">
                                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                            </div>
                        )}
                    </div>

                    <div className="property-filter-container">
                            <PropertyBar
                                properties={properties}
                                selectedProperty={selectedProperty}
                                onPropertyChange={setSelectedProperty}
                            />
                    </div>


                    <div className="product-card-collect">
                        <p>{filteredProducts?.length} products found</p>

                        {isLoading || isLoadingPage ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <div>
                                <p>An error occurred. Please try again.</p>
                                <button onClick={() => window.location.reload()}>Reload</button>
                            </div>
                        ) : (
                            <div className="productcard-mini">
                                {currentProducts?.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        )}

                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        />

                    </div>
                </div>


                <div class="card-notify">
                    <Cart />
                </div>
            </div>
        </>
    );
};

export default ProductMenu;
