import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaTag,
  FaCreditCard,
  FaTruck,
  FaMoneyBillWave,
  FaUniversity,
} from "react-icons/fa";
import { updateUserProfile } from "../../API/accountApi";
import { updateUserData } from "../../Account/authSlice";
import { clearCart } from "../Features/cartSlice";
import { fetchVouchers } from "../Features/VoucherSlice";
import { toast } from "react-toastify";
import SelectVoucher from "./SelectVoucher";
import { getUserProfile } from "../../API/accountApi";
import "./PayMoney.css";

const PayMoney = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const { items: availableVouchers } = useSelector((state) => state.vouchers);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  const handleVoucherSelect = (selectedVoucher) => {
    setVoucher(selectedVoucher.code);
    if (selectedVoucher.type === "percent") {
      setDiscount((cartTotalAmount * selectedVoucher.discount) / 100);
    } else {
      setDiscount(selectedVoucher.discount);
    }
    toast.success("Voucher applied successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    setShowVoucherModal(false);
  };

  const deliveryFees = {
    standard: 5,
    express: 15,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        dispatch(updateUserData(userData));
        setAddress(userData.address || "");
      } catch (err) {
        toast.error("Failed to load user data", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleSetAddress = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile({
        ...user,
        address: newAddress,
      });

      const freshUserData = await getUserProfile();
      dispatch(updateUserData(freshUserData));
      setAddress(freshUserData.address);
      setNewAddress("");
      setIsEditingAddress(false);

      toast.success("Address updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Failed to update address", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = () => {
    setNewAddress(address);
    setIsEditingAddress(true);
  };

  const renderVoucherSection = () => (
    <div className="paymoney-section">
      <h3>
        <FaTag /> Voucher
      </h3>
      <div className="voucher-input">
        <input
          type="text"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          placeholder="Enter voucher code"
          readOnly
        />
        <button onClick={() => setShowVoucherModal(true)}>
          Select Voucher
        </button>
      </div>
      {discount > 0 && (
        <p className="applied-voucher">Applied discount: ${discount}</p>
      )}
    </div>
  );

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please provide a shipping address", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      setLoading(true);
      // Mock API call to create order
      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(clearCart());
      toast.success("Order placed successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      navigate("/order-success");
    } catch (err) {
      toast.error("Failed to place order", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const finalAmount = cartTotalAmount + deliveryFees[deliveryMethod] - discount;

  return (
    <div className="paymoney-container">
      <div className="paymoney-content">
        <div className="paymoney-sections">
          {/* Address Section */}
          <div className="paymoney-section">
            <h3>
              <FaHome /> Shipping Address
            </h3>
            {isEditingAddress ? (
              <form onSubmit={handleSetAddress} className="address-form">
                <textarea
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                  required
                />
                <div className="address-actions">
                  <button type="submit" disabled={loading}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingAddress(false);
                      setNewAddress("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="address-display">
                <p>{address || "No address provided"}</p>
                <button onClick={handleEditAddress}>Edit Address</button>
              </div>
            )}
          </div>

          {/* Delivery Method Section */}
          <div className="paymoney-section">
            <h3>
              <FaTruck /> Delivery Method
            </h3>
            <div className="delivery-options">
              <label className="delivery-option">
                <input
                  type="radio"
                  value="standard"
                  checked={deliveryMethod === "standard"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="option-title">Standard Delivery</span>
                    <span className="option-price">
                      ${deliveryFees.standard}
                    </span>
                  </div>
                  <p className="option-description">
                    Delivery within 3-5 business days
                  </p>
                </div>
              </label>
              <label className="delivery-option">
                <input
                  type="radio"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="option-title">Express Delivery</span>
                    <span className="option-price">
                      ${deliveryFees.express}
                    </span>
                  </div>
                  <p className="option-description">
                    Delivery within 1-2 business days
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="paymoney-section">
            <h3>
              <FaCreditCard /> Payment Method
            </h3>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="option-title">Cash on Delivery</span>
                    <FaMoneyBillWave className="option-icon" />
                  </div>
                  <p className="option-description">
                    Pay with cash when your order arrives
                  </p>
                </div>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="option-title">Bank Transfer</span>
                    <FaUniversity className="option-icon" />
                  </div>
                  <p className="option-description">
                    Pay via bank transfer to our account
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Voucher Section */}
          <div className="paymoney-section">
            {renderVoucherSection()}
            {showVoucherModal && (
              <SelectVoucher
                vouchers={availableVouchers}
                onSelect={handleVoucherSelect}
                onClose={() => setShowVoucherModal(false)}
              />
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="paymoney-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cartTotalAmount}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>${deliveryFees[deliveryMethod]}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-${discount}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>${finalAmount}</span>
            </div>
          </div>

          <div className="paymoney-actions">
            <button
              className="back-button"
              onClick={() => navigate("/confirm")}
            >
              <FaArrowLeft /> Back
            </button>
            <button
              className="place-order-button"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayMoney;
