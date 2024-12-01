import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    item: [],  // Đây là nơi lưu danh sách sản phẩm
    status: null,
};

// Fetch dữ liệu sản phẩm
export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async(id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/products");
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // Reducer để thêm đánh giá vào sản phẩm
        addReview: (state, action) => {
            const { productId, review } = action.payload;

            // Tìm sản phẩm theo productId và thêm đánh giá
            const product = state.item.find(product => product.id === productId); // Sử dụng 'item' thay vì 'products'
            if (product) {
                product.reviews = product.reviews ? [...product.reviews, review] : [review];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(productsFetch.pending, (state) => {
                state.status = "pending";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.item = action.payload;  // Lưu dữ liệu sản phẩm vào 'item'
            })
            .addCase(productsFetch.rejected, (state) => {
                state.status = "rejected";
            });
    },
});

export const { addReview } = productsSlice.actions;  // Xuất action addReview

export default productsSlice.reducer;
