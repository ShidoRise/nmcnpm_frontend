import React from "react";
import { FilterSearch } from "./FilterSearch";
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search-bar">
            <img src="images/imagesHome/logosearch.PNG" alt="Search"/>
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)} // Gọi hàm khi giá trị thay đổi
            />
            <div className="search-input"><FaSearch /></div>
        </div>
    );
};

export default SearchBar;
