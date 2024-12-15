import React from "react";
import "./FilterPrice.css";

export const FilterPrice = ({ selectedPriceRange, setSelectedPriceRange }) => {
  const priceRanges = [
    { label: "All", value: "all" },
    { label: "Under $10", value: "0-10" },
    { label: "$10 - $20", value: "10-20" },
    { label: "$20 - $30", value: "20-30" },
    { label: "Over $30", value: "30-" },
  ];

  return (
    <div className="filter-price">
      {priceRanges.map((range) => (
        <button
          key={range.value}
          className={`filter-btn ${
            selectedPriceRange === range.value ? "active" : ""
          }`}
          onClick={() => setSelectedPriceRange(range.value)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};
