import React from "react";
import "./VoucherList.css";

const VoucherList = ({ vouchers }) => {
  return (
    <div className="voucher-container-card">
      <div className="voucher-title">
        <h1>List of Voucher</h1>
      </div>
      <div className="voucher-list">
        {vouchers.map((voucher) => (
          <div className="voucher-card" key={voucher.id}>
            <img src={voucher.path} alt={voucher.title} />
            <h3>{voucher.title}</h3>
            <p>
              Code: <strong>{voucher.code}</strong>
            </p>
            <p>
              Discount:{" "}
              <strong>
                {voucher.discount}
                {voucher.type === "value" ? "$" : "%"}
              </strong>
            </p>
            <p>Expiry Date: {voucher.expiryDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
