import React from "react";
import "./FilterCategory.css";

export const FilterCategory = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { label: "All", value: "all" },
    { label: "Pizza", value: "Pizza" },
    { label: "Burger", value: "Burger" },
    { label: "Tacos", value: "Tacos" },
    { label: "Drink", value: "Drink" },
  ];

  return (
    <div className="filter-category">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`filter-btn ${
            selectedCategory === category.value ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
