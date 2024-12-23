import React, { useState } from "react";
import "./EditProductModal.css";

const EditProductModal = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    isActive: product.isActive,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="edit-product-modal__overlay">
      <div className="edit-product-modal__content">
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit} className="edit-product-modal__form">
          <div className="edit-product-modal__form-group">
            <label>Name:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-product-modal__form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-product-modal__form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Pizza">Pizza</option>
              <option value="Chicken">Chicken</option>
              <option value="Drink">Drink</option>
              <option value="Cake">Cake</option>
            </select>
          </div>

          <div className="edit-product-modal__form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-product-modal__actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
