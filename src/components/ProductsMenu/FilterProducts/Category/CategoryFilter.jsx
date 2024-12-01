import './CategoryFilter.css';
import React, { useState } from "react";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    const [isCategoryActive, setCategoryActive] = useState(false);

    const toggleCategory = () => {
        setCategoryActive(!isCategoryActive);
    };

    return (
        <div className={`category-filter ${isCategoryActive ? "active" : ""}`}>
            <button
                className="Category-title"
                onClick={toggleCategory}
            >
                Category
            </button>
            <button
                className={`filter-category-btn ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => onCategoryChange("all")}
            >
                All
            </button>
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={`filter-category-btn ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
