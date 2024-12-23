import React, { useState } from "react";
import axios from "axios";
import "./CreateProductModal.css";

const CreateProductModal = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Pizza",
    imageUrl: "",
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pizzwang");

    setUploading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbxy8q910/image/upload",
        formData
      );
      setFormData((prev) => ({ ...prev, imageUrl: response.data.secure_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="create-product-modal__overlay">
      <div className="create-product-modal__content">
        <h3>Create New Product</h3>
        <form onSubmit={handleSubmit} className="create-product-modal__form">
          <div className="create-product-modal__form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="create-product-modal__form-group">
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <div className="create-product-modal__form-group">
            <label>Image Upload:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="create-product-modal__file-input"
            />
            {uploading && (
              <div className="create-product-modal__loading">Uploading...</div>
            )}
            {formData.imageUrl && (
              <div className="create-product-modal__image-preview">
                <img src={formData.imageUrl} alt="Preview" />
              </div>
            )}
          </div>

          <div className="create-product-modal__form-group">
            <label>Category:</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Pizza">Pizza</option>
              <option value="Chicken">Chicken</option>
              <option value="Drink">Drink</option>
              <option value="Cake">Cake</option>
            </select>
          </div>

          <div className="create-product-modal__form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="create-product-modal__actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
