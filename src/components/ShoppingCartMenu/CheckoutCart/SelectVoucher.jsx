import React from "react";
import "./SelectVoucher.css";

const SelectVoucher = ({ vouchers, onSelect, onClose }) => {
  return (
    <div className="modal-voucher">
      <div className="modal-content-voucher">
        <div className="modal-header">
          <h4>Available Vouchers</h4>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="vouchers-list">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="voucher-item">
              <div className="voucher-info">
                <h4>{voucher.title}</h4>
                <p>
                  Code: <strong>{voucher.code}</strong>
                </p>
                <p>
                  Discount: {voucher.discount}
                  {voucher.type === "value" ? "$" : "%"}
                </p>
                <p>Valid until: {voucher.expiryDate}</p>
              </div>
              <button
                className="select-voucher-btn"
                onClick={() => onSelect(voucher)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectVoucher;
