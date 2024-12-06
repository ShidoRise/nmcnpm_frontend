import React, { useState, useEffect } from "react";
import "./PayMoney.css";
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidDiscount } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import "reactjs-popup/dist/index.css";
import ChangeAddress from "./ChangeAddress";
import SelectVoucher from "./SelectVoucher";
import { useDispatch, useSelector } from "react-redux";
import { fetchVouchers } from "../Features/VoucherSlice";
import { ButtonMenu } from "../../ProductsMenu/ButtonMenu/ButtonMenu";
import { updateUserData } from "../../Account/authSlice";
import { getUserProfile, updateUserProfile } from "../../API/accountApi";
import { toast } from "react-toastify";

const PayMoney = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const openChangeAddress = () => setShowChangeAddress(true);
  const closeChangeAddress = () => setShowChangeAddress(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setAddress(profileData.address || "");
        dispatch(updateUserData(profileData));
      } catch (err) {
        toast.error("Failed to load address");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleSetAddress = async (event) => {
    event.preventDefault();
    try {
      setAddress(newAddress);
      const updatedUser = await updateUserProfile({
        ...user,
        address: newAddress,
      });

      dispatch(updateUserData(updatedUser));

      toast.success("Address updated successfully!", {
        position: "bottom-left",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Failed to update address", {
        position: "bottom-left",
        autoClose: 3000,
      });
    }
  };

  const handleSetNewAddress = (event) => {
    event.preventDefault();
    setNewAddress(event.target.value);
  };

  // Voucher
  const vouchers = useSelector((state) => state.vouchers.items);
  const status = useSelector((state) => state.vouchers.status);

  const [showSelectVoucher, setShowSelectVoucher] = useState(false);
  const openSelectVoucher = () => setShowSelectVoucher(true);
  const closeSelectVoucher = () => setShowSelectVoucher(false);
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    closeSelectVoucher();
  };

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Order
  const [showModalOrderSuccess, setShowModalOrderSuccess] = useState(false);
  const handlePlaceOrderSuccess = () => {
    setShowModalOrderSuccess(true);
  };

  // QR
  const [showQRCode, setShowQRCode] = useState(false);
  const handleShowQRCode = () => {
    setShowQRCode(true);
  };
  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  const handleClickTransferred = () => {
    handleCloseQRCode();
    handlePlaceOrderSuccess();
  };

  const handleClickOrder = () => {
    paymentMethod === "cod" ? handlePlaceOrderSuccess() : handleShowQRCode();
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVouchers());
    }
  }, [dispatch, status]);

  return (
    <div className="main">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="address-container">
          <div className="address-header">
            <HiLocationMarker />
            Address
          </div>
          <div className="address">
            <div className="user-name">
              {user?.name} ({user?.phoneNumber})
            </div>
            <div className="user-address">
              {address || "No address available"}
            </div>
            <div className="change-address" onClick={openChangeAddress}>
              Change Address
            </div>
            {showChangeAddress && (
              <ChangeAddress
                handleSetNewAddress={handleSetNewAddress}
                closeChangeAddress={closeChangeAddress}
                handleSetAddress={handleSetAddress}
              />
            )}
          </div>
        </div>
      )}
      <div className="voucher-container">
        <div className="voucher-header">
          <BiSolidDiscount />
          Voucher
        </div>
        <div
          className="select-voucher"
          onClick={() => {
            openSelectVoucher();
          }}
        >
          Select Voucher
        </div>
        {selectedVoucher && (
          <div className="selected-voucher">
            <h4>Selected Voucher</h4>
            <button onClick={() => setSelectedVoucher(null)}>
              <IoClose />
            </button>
            <div>{selectedVoucher.title}</div>
            <div></div>
            <div>
              Mã: <strong>{selectedVoucher.code}</strong>
            </div>
          </div>
        )}
        {showSelectVoucher && (
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
            <div className="qrcode">
              <img
                src="https://res.cloudinary.com/dxxiercxx/image/upload/v1733408095/462571951_1088195269413055_2729153872552906077_n_hbbldp.jpg"
                alt="QR-Code"
              />
            </div>

            <button onClick={() => handleClickTransferred()}>
              Transferred
            </button>
          </div>
        </div>
      )}

      {/* Modal Thông báo */}
      {showModalOrderSuccess && (
        <div className="modal-overlay-order-success">
          <div className="modal-order-success">
            <h2>Success!!!</h2>
            <p>
              Thank you for your order. We will process your order as soon as
              possible.
            </p>
            <ButtonMenu to="/" className="back-homepage">
              <FaArrowAltCircleLeft /> Back to HomePage
            </ButtonMenu>
          </div>
        </div>
      )}

      <div className="paymoney-subtotal-container">
        <div className="paymoney-subtotal">Subtotal:</div>
        <div className="paymoney-amount">
          $
          {Math.max(
            0,
            selectedVoucher
              ? cart.cartTotalAmount -
                  (selectedVoucher.type === "value"
                    ? selectedVoucher.discount
                    : (selectedVoucher.discount * cart.cartTotalAmount) / 100)
              : cart.cartTotalAmount
          )}
        </div>
        <div className="order">
          <button onClick={() => handleClickOrder()}>Order</button>
        </div>
      </div>
    </div>
  );
};
export default PayMoney;
