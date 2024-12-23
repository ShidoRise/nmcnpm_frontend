import React from "react";
import Modal from "react-modal";
import { QRCodeSVG } from "qrcode.react";
import "./BankTransferModal.css";

Modal.setAppElement("#root");

const BankTransferModal = ({ isOpen, onClose, onConfirm, amount }) => {
  const bankInfo = {
    bankName: "VietinBank",
    accountNumber: "0332583676",
    accountName: "PHAM HUY SON",
    amount: amount,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bank-modal"
      overlayClassName="bank-modal-overlay"
    >
      <div className="bank-modal-content">
        <h2>Bank Transfer Details</h2>
        <div className="qr-code-container">
          <QRCodeSVG
            value={`${bankInfo.bankName}|${bankInfo.accountNumber}|${amount}`}
            size={200}
          />
        </div>
        <div className="bank-details">
          <p>
            <strong>Bank:</strong> {bankInfo.bankName}
          </p>
          <p>
            <strong>Account:</strong> {bankInfo.accountNumber}
          </p>
          <p>
            <strong>Name:</strong> {bankInfo.accountName}
          </p>
          <p>
            <strong>Amount:</strong> ${amount}
          </p>
        </div>
        <div className="bank-modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            I have completed the transfer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BankTransferModal;
