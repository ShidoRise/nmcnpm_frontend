import React from "react";
import Modal from "react-modal";
import { FaMinus, FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import "./QuantityModal.css";

Modal.setAppElement("#root");

const QuantityModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  quantity,
  setQuantity,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="quantity-modal-container"
      overlayClassName="quantity-modal-overlay"
    >
      <div className="quantity-modal-content">
        <h3 className="quantity-modal-title">Select Quantity</h3>

        <div className="quantity-modal-product">
          <div className="quantity-modal-image">
            <img src={product?.image} alt={product?.title} />
          </div>
          <div className="quantity-modal-details">
            <h4>{product?.title}</h4>
            <p className="quantity-modal-price">${product?.price}</p>
          </div>
        </div>

        <div className="quantity-modal-controls">
          <button
            className="quantity-modal-button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="quantity-modal-value">{quantity}</span>
          <button
            className="quantity-modal-button"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <FaPlus />
          </button>
        </div>

        <div className="quantity-modal-actions">
          <button className="quantity-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="quantity-modal-confirm"
            onClick={() => onConfirm(quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
};

QuantityModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  product: PropTypes.object,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
};

export default QuantityModal;
