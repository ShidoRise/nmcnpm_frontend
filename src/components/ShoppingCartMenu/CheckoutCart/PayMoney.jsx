import React, { useState, useEffect } from "react";
import './PayMoney.css';
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidDiscount } from "react-icons/bi";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ChangeAddress from './ChangeAddress';
import SelectVoucher from './SelectVoucher';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVouchers } from '../Features/VoucherSlice';
const PayMoney = (props) => {
    const cart = useSelector((state) => state.cart);
    const [user, setUser] = useState({
        name: "Chu Thanh Thong",
        number: "06969838666"
    })
    const [address, setAddress] = useState("ĐHBK HN, Phuong Bach Khoa, Quan Hai Ba Trung, Ha Noi");
    const [newAddress, setNewAddress] = useState("");
    
    const [showChangeAddress, setShowChangeAddress] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const openChangeAddress = () => setShowChangeAddress(true);
    const closeChangeAddress = () => setShowChangeAddress(false);

    const handleSetAddress = (event)=>{
        event.preventDefault();
        setAddress(newAddress);
    }
    const handleSetNewAddress = (event)=>{
        event.preventDefault();
        setNewAddress(event.target.value);
    }
    const dispatch = useDispatch();
    const vouchers = useSelector((state) => state.vouchers.items); // Lấy danh sách voucher từ Redux
    const status = useSelector((state) => state.vouchers.status); // Lấy trạng thái tải dữ liệu

    const [showSelectVoucher,setShowSelectVoucher] = useState(false);
    const openSelectVoucher = () => setShowSelectVoucher(true);
    const closeSelectVoucher = () => setShowSelectVoucher(false);
    const handleSelectVoucher = (voucher) => {
        setSelectedVoucher(voucher);
        openSelectVoucher(false);
    };
    useEffect(() => {
        if (status === "idle") {
          dispatch(fetchVouchers());
        }
      }, [dispatch, status]);
    return(
        <div className='main'>
            <div className="address-container">
                <div className='address-header'>
                    <HiLocationMarker />
                    Address
                </div>
                <div className='address'>
                    <div className='user-name'>
                       {user.name + " (" + user.number +")"}
                    </div>
                    <div className='user-address'>
                        {address}
                    </div>
                    
                    <div className='change-address' onClick={()=>{openChangeAddress()}}>Change Address</div>
                    {showChangeAddress && (
                        <ChangeAddress
                        handleSetNewAddress={handleSetNewAddress}
                        closeChangeAddress={closeChangeAddress}
                        handleSetAddress={handleSetAddress}
                        />
                    )}
                </div>
            </div>
            <div className='voucher-container'>
                <div className='voucher-header'>
                    <BiSolidDiscount/>
                    Voucher
                </div>
                <div className='select-voucher' onClick={()=>{openSelectVoucher()}}>Select Voucher</div>
                {selectedVoucher && (
                    <div className="selected-voucher">
                    <h2>Voucher đã chọn:</h2>
                    <p>{selectedVoucher.title}</p>
                    <p>Mã: <strong>{selectedVoucher.code}</strong></p>
                    </div>
                )}
                {showSelectVoucher&&(
                    <SelectVoucher
                    vouchers={vouchers} 
                    onSelect={handleSelectVoucher} 
                    onClose={closeSelectVoucher}
                    />
                )}
            </div>

            <div className="confirm-subtotal">
                <span>Subtotal</span>
                <span className="confirm-amount">${cart.cartTotalAmount}</span>
            </div>

        </div>
        
    );
}
export default PayMoney;