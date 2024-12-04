import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dữ liệu giả để lấy danh sách voucher từ server (thay bằng API thật nếu cần)
const fetchVouchersFromServer = async () => {
  return [
		{ id: 1,
		  title: "Discount 10%",
		  path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229528/Designer_9_jybgns.jpg",
		  code: "SAVE10%",
		  discount: 10,
		  type: "percent",
		  expiryDate: "2024-12-31"
		},

        { id: 2,
		  title: "Discount 10$",
		  path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229527/Designer_11_nfkdec.jpg",
		  code: "SAVE10$",
		  discount: 10,
		  type: "value",
		  expiryDate: "2024-11-30"
		},

        { id: 3,
		  title: "Discount 20%",
		  path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229528/Designer_10_ld22uo.jpg",
		  code: "SAVE20%",
		  discount: 20,
		  type: "percent",
		  expiryDate: "2024-12-15"
		},

        { id: 4,
		  title: "Discount 15$",
		  path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229527/Designer_15_fnfnd8.jpg",
		  code: "SAVE15$",
		  discount: 15,
		  type: "value",
		  expiryDate: "2024-12-15"
		},

        { id: 5,
		  title: "Discount 25$",
		  path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229527/Designer_12_zkbost.jpg",
		  code: "SAVE25$",
		  discount: 25,
		  type: "value",
		  expiryDate: "2024-12-15"
		},

        { id: 6,
		  title: "Discount 35$",
		  path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229527/Designer_14_l2sxpt.jpg",
		  code: "SAVE35$",
		  discount: 35,
		  type: "value",
		  expiryDate: "2024-12-15"
		},

		{ id: 7,
			title: "Discount 30%",
			path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229526/Designer_16_dmbich.jpg",
			code: "SAVE30$",
			discount: 30,
			type: "value",
			expiryDate: "2024-12-15"
		},

		{ id: 8,
			title: "Discount 50%",
			path: "https://res.cloudinary.com/dxxiercxx/image/upload/v1733229529/Designer_17_csggfz.jpg",
			code: "SAVE50%",
			discount: 50,
			type: "value",
			expiryDate: "2024-12-15"
		},
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
