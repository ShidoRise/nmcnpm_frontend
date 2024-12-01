import React from "react";
import "./VoucherList.css";

const VoucherList = ({ vouchers }) => {
  return (
    <div className="voucher-list">
      {vouchers.map((voucher) => (
        <div className="voucher-card" key={voucher.id}>
          <h3>{voucher.title}</h3>
          <p>Voucher: <strong>{voucher.code}</strong></p>
          <p>Discount: <strong>{voucher.discount}{voucher.type=="value" ? "$" : "%"}</strong></p>
          <p>Expiry Date: {voucher.expiryDate}</p>
        </div>
      ))}
    </div>
  );
};

export default VoucherList;
