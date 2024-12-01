import { useState } from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import './PayMoney.css';
const SelectVoucher = ({ vouchers, onSelect, onClose }) => {
    return(
        <div className="modal">
            <div className="modal-content">
                <h4>Your Voucher</h4>
                <ul className="voucher-list">
                    {vouchers.map((voucher) => (
                        <li key={voucher.id} className="voucher-item">
                        <div>
                            <h3>{voucher.title}</h3>
                            <p>Mã: <strong>{voucher.code}</strong></p>
                            <p>Giảm giá: {voucher.discount}%</p>
                            <p>Hạn: {voucher.expiryDate}</p>
                        </div>
                        <button onClick={() => onSelect(voucher)}>Chọn</button>
                        </li>
                    ))}
                </ul>
                <button onClick={()=>onClose()}>Save Change</button>
            </div>
        </div>
    );
}
export default SelectVoucher;