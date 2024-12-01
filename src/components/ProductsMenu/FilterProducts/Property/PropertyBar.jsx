import React from "react";
import "./PropertyBar.css";

const PropertyBar = ({ properties, selectedProperty, onPropertyChange }) => {
    return (
        <div className="property-bar">
            <div className="filter-buttons">
                <button
                    className={`filter-btn ${selectedProperty === "all" ? "active" : ""}`}
                    onClick={() => onPropertyChange("all")}
                >
                    All
                </button>
                {properties.map((property, index) => (
                    <button
                        key={index}
                        className={`filter-btn ${selectedProperty === property ? "active" : ""}`}
                        onClick={() => onPropertyChange(property)}
                    >
                        {property}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PropertyBar;
