import React, { useState, useEffect } from "react";
import './PayMoney.css';
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidDiscount } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ChangeAddress from './ChangeAddress';
import SelectVoucher from './SelectVoucher';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVouchers } from '../Features/VoucherSlice';
import { ButtonMenu } from '../../ProductsMenu/ButtonMenu/ButtonMenu';

const PayMoney = (props) => {
    const cart = useSelector((state) => state.cart);
    // set user tạm thời
    const [user, setUser] = useState({
        name: "Chu Thanh Thong",
        number: "06969838666"
    })
    //địa chỉ
    const [address, setAddress] = useState("ĐHBK HN, Phuong Bach Khoa, Quan Hai Ba Trung, Ha Noi");
    const [newAddress, setNewAddress] = useState("");
    //show cửa sổ đổi địa chỉ
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

    //voucher
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


    //payment
    const [paymentMethod, setPaymentMethod] = useState("transfer"); // Lưu phương thức thanh toán
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value); // Cập nhật phương thức thanh toán khi thay đổi
    };

    //cửa sổ thông báo đặt hàng thành công
    const [showModalOrderSuccess, setShowModalOrderSuccess] = useState(false); // Trạng thái modal

    const handlePlaceOrderSuccess = () => {
        setShowModalOrderSuccess(true); // Hiển thị modal khi nhấn nút Đặt hàng
    };

    const handleCloseOrderSuccess = () => {
        setShowModalOrderSuccess(false); // Đóng modal khi nhấn nút Đóng
    };


    //cửa sổ hiện qrcode
    const [showQRCode, setShowQRCode] = useState(false); // Trạng thái modal

    const handleShowQRCode = () => {
        setShowQRCode(true); // Hiển thị modal khi nhấn nút Đặt hàng
    };

    const handleCloseQRCode = () => {
        setShowQRCode(false); // Đóng modal khi nhấn nút Đóng
    };

    const handleClickTransferred = () => {
        handleCloseQRCode();
        handlePlaceOrderSuccess();
    }
    //click order:
    //nếu phương thức thanh toán là cod thì hiển thị đặt hàng thành công
    //nếu phương thức thanh toán là transfer thì hiển thị qr code
    const handleClickOrder = () => {
        paymentMethod === "cod" ? handlePlaceOrderSuccess() : handleShowQRCode();
    }

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
                        <h4>Selected Voucher</h4>
                        <button onClick={()=>setSelectedVoucher(null)}><IoClose /></button>
                        <div>{selectedVoucher.title}</div>
                        <div></div>
                        <div>Mã: <strong>{selectedVoucher.code}</strong></div>
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

            <div className="payment-method">
                <div className="select-payment">
                    <MdPayment />
                    Select Payment Method
                </div>
                
                <select value={paymentMethod} onChange={handlePaymentChange}>
                    <option value="transfer">Transfer</option>
                    <option value="cod">Cash On Delivery</option>
                </select>
            </div>

            {/* Modal Thông báo */}
            {showQRCode && (
                <div className="modal-overlay-qrcode">
                    <div className="modal-qrcode">
                        <div className="modal-qrcode-header">Transfer QR</div>
                        <div className="qrcode">QR Code Here</div>
                        
                        <button onClick={()=>handleClickTransferred()}>Transferred</button>
                    </div>
                </div>
                )
            }


             {/* Modal Thông báo */}
            {showModalOrderSuccess && (
                <div className="modal-overlay-order-success">
                    <div className="modal-order-success">
                        <h2>Success!!!</h2>
                        <p>Thank you for your order. We will process your order as soon as possible.</p>
                        <ButtonMenu to="/" className="back-homepage"><FaArrowAltCircleLeft /> Back to HomePage</ButtonMenu>
                    </div>
                </div>
                )
            }

            <div className="paymoney-subtotal-container">
                <div className="paymoney-subtotal">Subtotal:</div>
                <div className="paymoney-amount">${
                Math.max(0,selectedVoucher? (cart.cartTotalAmount-(selectedVoucher.type==="value"?selectedVoucher.discount:(selectedVoucher.discount*cart.cartTotalAmount/100))):cart.cartTotalAmount)
                }</div>
                <div className="order">
                    <button onClick={()=>handleClickOrder()}>Order</button>
                </div>
            </div>

        </div>
        
    );
}
export default PayMoney;