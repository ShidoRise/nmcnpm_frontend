import React from "react";

const ChangeAddress = ({
  handleSetAddress,
  closeChangeAddress,
  handleSetNewAddress,
}) => {
  return (
    <div className="modal-address">
      <div className="modal-content-address">
        <h4>New Address</h4>
        <form
          className="new-address"
          onSubmit={(event) => {
            event.preventDefault();
            handleSetAddress(event);
            closeChangeAddress();
          }}
        >
          <input
            type="text"
            placeholder="Your new address"
            onChange={handleSetNewAddress}
            required
          />
          <button type="submit">Save Change</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeAddress;
