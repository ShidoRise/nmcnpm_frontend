import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dữ liệu giả để lấy danh sách voucher từ server (thay bằng API thật nếu cần)
const fetchVouchersFromServer = async () => {
  return [
		{ id: 1, title: "Discount 10%", code: "SAVE10%", discount: 10, type: "percent", expiryDate: "2024-12-31" },
        { id: 2, title: "Discount 10$", code: "SAVE10$", discount: 10, type: "value", expiryDate: "2024-11-30" },
        { id: 3, title: "Discount 20%", code: "SAVE20%", discount: 20, type: "percent", expiryDate: "2024-12-15" },
        { id: 4, title: "Discount 15$", code: "SAVE15$", discount: 15, type: "value", expiryDate: "2024-12-15" },
        { id: 5, title: "Discount 25$", code: "SAVE25$", discount: 25, type: "value", expiryDate: "2024-12-15" },
        { id: 6, title: "Discount 35$", code: "SAVE35$", discount: 35, type: "value", expiryDate: "2024-12-15" },
  ];
};

// Async Thunk để lấy danh sách voucher
export const fetchVouchers = createAsyncThunk("vouchers/fetchVouchers", async () => {
  const response = await fetchVouchersFromServer(); // Giả lập gọi API
  return response;
});

// Slice quản lý trạng thái voucher
const voucherSlice = createSlice({
  name: "vouchers",
  initialState: {
	items: [],
	status: "idle", // idle | loading | succeeded | failed
	error: null,
  },
  reducers: {
	addVoucher: (state, action) => {
	  state.items.push(action.payload);
	},
	removeVoucher: (state, action) => {
	  state.items = state.items.filter((voucher) => voucher.id !== action.payload);
	},
	updateVoucher: (state, action) => {
	  const index = state.items.findIndex((voucher) => voucher.id === action.payload.id);
	  if (index !== -1) {
		state.items[index] = action.payload;
	  }
	},
  },
  extraReducers: (builder) => {
	builder
	  .addCase(fetchVouchers.pending, (state) => {
		state.status = "loading";
	  })
	  .addCase(fetchVouchers.fulfilled, (state, action) => {
		state.status = "succeeded";
		state.items = action.payload;
	  })
	  .addCase(fetchVouchers.rejected, (state, action) => {
		state.status = "failed";
		state.error = action.error.message;
	  });
  },
});

// Export các action và reducer
export const { addVoucher, removeVoucher, updateVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
