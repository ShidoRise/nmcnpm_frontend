import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVouchers } from "../components/ShoppingCartMenu/Features/VoucherSlice";
import VoucherList from "../components/Voucher/VoucherList";
function Voucher() {
  const dispatch = useDispatch();
  const { items: vouchers } = useSelector((state) => state.vouchers);
  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);
  return (
    <div className="App">
      <VoucherList vouchers={vouchers} />
    </div>
  );
}

export default Voucher;
