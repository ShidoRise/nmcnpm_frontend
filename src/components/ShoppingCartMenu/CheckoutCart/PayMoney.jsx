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
import {
  updateCart,
  getTotals,
  updateCartToBackend,
  clearCart,
  fetchCart,
} from "../Features/cartSlice";
import { fetchVouchers } from "../Features/VoucherSlice";
import { createOrder } from "../../API/ordersAPI";
import { getUserProfile } from "../../API/accountApi";
import { toast } from "react-toastify";
import BankTransferModal from "./BankTransferModal";
import SelectVoucher from "./SelectVoucher";
import "./PayMoney.css";

const PayMoney = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { items: availableVouchers } = useSelector((state) => state.vouchers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      }
    };
    fetchUserData();
    dispatch(fetchVouchers());
  }, [dispatch]);

  const handleVoucherSelect = (selectedVoucher) => {
    setVoucher(selectedVoucher.code);
    if (selectedVoucher.type === "percent") {
      setDiscount((cartTotalAmount * selectedVoucher.discount) / 100);
    } else {
      setDiscount(selectedVoucher.discount);
    }
    setShowVoucherModal(false);
    toast.success("Voucher applied successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleSetAddress = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const updatedUser = await updateUserProfile({
        ...user,
        address: newAddress,
      });
      dispatch(updateUserData(updatedUser));
      setAddress(newAddress);
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

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart());
      await dispatch(updateCart([]));
      await dispatch(getTotals());
      await dispatch(updateCartToBackend()).unwrap();
      await dispatch(fetchCart());
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const createOrderAndRedirect = async () => {
    try {
      console.log("Creating order...");
      console.log("Cart items:", cartItems);
      const orderPayload = {
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        orderData: {
          totalPrice: finalAmount,
          address: address,
          shippingMethod: deliveryMethod,
          paymentMethod: paymentMethod,
        },
      };
      console.log("Order payload:", orderPayload);
      await createOrder(orderPayload);
      await handleClearCart();

      toast.success("Order placed successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to create order", {
        position: "bottom-right",
        autoClose: 2000,
      });
      throw err;
    }
  };

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please provide a shipping address", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      setIsProcessing(true);
      if (paymentMethod === "bank") {
        setShowBankModal(true);
        return;
      }
      console.log("Placing order...");
      await createOrderAndRedirect();
    } catch (err) {
      toast.error("Failed to place order", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankTransferConfirm = async () => {
    try {
      await createOrderAndRedirect();
      setShowBankModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const finalAmount = cartTotalAmount + deliveryFees[deliveryMethod] - discount;

  return (
    <>
      <div className="paymoney-container">
        <div className="paymoney-content">
          <div className="paymoney-sections">
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
                  <button
                    onClick={() => {
                      setNewAddress(address);
                      setIsEditingAddress(true);
                    }}
                  >
                    Edit Address
                  </button>
                </div>
              )}
            </div>

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
                      <FaMoneyBillWave className="payment-icon" />
                    </div>
                    <p className="option-description">
                      Pay when your order arrives
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
                      <FaUniversity className="payment-icon" />
                    </div>
                    <p className="option-description">
                      Pay via bank transfer to our account
                    </p>
                  </div>
                </label>
              </div>
            </div>

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
            {showVoucherModal && (
              <SelectVoucher
                vouchers={availableVouchers}
                onSelect={handleVoucherSelect}
                onClose={() => setShowVoucherModal(false)}
              />
            )}
          </div>

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
                disabled={loading || isProcessing}
              >
                {loading || isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BankTransferModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        onConfirm={handleBankTransferConfirm}
        amount={finalAmount}
      />
    </>
  );
};

export default PayMoney;
