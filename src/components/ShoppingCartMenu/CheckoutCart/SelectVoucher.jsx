import { useState } from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import './PayMoney.css';
const SelectVoucher = ({ vouchers, onSelect, onClose }) => {
    return(
        <div className="modal-voucher">
            <div className="modal-content-voucher">
                <h4>Your Voucher</h4>
                <ul className="voucher-list">
                    {vouchers.map((voucher) => (
                        <li key={voucher.id} className="voucher-item">
                        <div>
                            <h4>{voucher.title}</h4>
                            <div>Code: <strong>{voucher.code}</strong></div>
                            <div>Discount: {voucher.discount}{voucher.type==="value" ? "$" : "%"}</div>
                            <div>Expiry Date: {voucher.expiryDate}</div>
                        </div>
                        <button onClick={() => onSelect(voucher)}>Select</button>
                        </li>
                    ))}
                </ul>
                <div className='modal-voucher-footer'>
                    <button className="save-button" onClick={()=>onClose()}>Save Change</button>
                </div>
            </div>
        </div>
    );
}
export default SelectVoucher;