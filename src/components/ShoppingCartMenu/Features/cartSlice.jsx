import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCart, updateCartProducts } from "../../API/cartAPI";

const loadState = () => {
  try {
    const cartItems = localStorage.getItem("cartItems");
    const cartTotalAmount = localStorage.getItem("cartTotalAmount");
    return {
      cartItems: cartItems ? JSON.parse(cartItems) : [],
      cartTotalAmount: cartTotalAmount ? parseFloat(cartTotalAmount) : 0,
      isLoading: false,
      error: null,
    };
  } catch (err) {
    return {
      cartItems: [],
      cartTotalAmount: 0,
      isLoading: false,
      error: null,
    };
  }
};

const saveState = (cartItems, cartTotalAmount) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotalAmount", cartTotalAmount.toString());
  } catch (err) {
    console.error("Failed to save cart state:", err);
  }
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const cart = await getUserCart();

      if (!cart || !cart.Products) {
        return {
          Products: [],
          totalPrice: 0,
        };
      }

      const formattedProducts = cart.Products.map((product) => ({
        productId: parseInt(product.id || product.productId),
        quantity: parseInt(
          product.quantity || product.CartProduct?.quantity || 1
        ),
        price: parseFloat(product.price || product.CartProduct?.price),
      }));

      return {
        Products: formattedProducts,
        totalPrice: cart.totalPrice || 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCartToBackend = createAsyncThunk(
  "cart/updateCartToBackend",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { cartItems, cartTotalAmount } = getState().cart;
      console.log("Updating cart to backend:", cartItems, cartTotalAmount);
      await updateCartProducts({
        products: cartItems,
        cartData: {
          totalPrice: cartTotalAmount,
        },
      });
      return {
        Products: cartItems,
        totalPrice: cartTotalAmount,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload?.id || !action.payload?.price) return;

      const { id, price, quantity = 1 } = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item.productId === parseInt(id)
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += parseInt(quantity);
      } else {
        state.cartItems.push({
          productId: parseInt(id),
          quantity: parseInt(quantity),
          price: parseFloat(price),
        });
      }

      const total = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      saveState(state.cartItems, state.cartTotalAmount);
    },

    getTotals(state) {
      if (!state.cartItems?.length) {
        state.cartTotalAmount = 0;
        saveState([], 0);
        return;
      }

      const total = state.cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
        0
      );
      console.log("Total amount:", total);
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      console.log("Cart total amount:", state.cartTotalAmount);
      saveState(state.cartItems, state.cartTotalAmount);
    },

    updateCart: (state, action) => {
      state.cartItems = action.payload;
      const total = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.cartTotalAmount = parseFloat(total.toFixed(2));
      saveState(state.cartItems, state.cartTotalAmount);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      state.items = [];
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotalAmount");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.Products;
        state.cartTotalAmount = action.payload.totalPrice.toFixed(2);
        state.isLoading = false;
      })
      .addCase(updateCartToBackend.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(clearCart, (state) => {
        state.cartItems = [];
        state.cartTotalQuantity = 0;
        state.cartTotalAmount = 0;
      });
  },
});

export const { addToCart, getTotals, updateCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
