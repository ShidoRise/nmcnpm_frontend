import './PriceBar.css';
import React, { useState } from "react";

const PriceBar = ({ priceRanges, selectedPriceRange, onPriceChange }) => {
    const [isPriceActive, setPriceActive] = useState(false);

    const togglePriceBar = () => {
        setPriceActive(!isPriceActive);
    };

    return (
        <div className={`price-bar ${isPriceActive ? "active" : ""}`}>
            <button
                className="price-title"
                onClick={togglePriceBar}
            >
                Price Range
            </button>
            <button
                className={`filter-price-btn ${selectedPriceRange === "all" ? "active" : ""}`}
                onClick={() => onPriceChange("all")}
            >
                All
            </button>
            {priceRanges.map((range, index) => (
                <button
                    key={index}
                    className={`filter-price-btn ${selectedPriceRange === range.value ? "active" : ""}`}
                    onClick={() => onPriceChange(range.value)}
                >
                    {range.label}
                </button>
            ))}
        </div>
    );
};

export default PriceBar;
