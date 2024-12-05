import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return {
        isLoggedIn: false,
        user: null,
        error: null,
      };
    }
    return {
      isLoggedIn: true,
      user: JSON.parse(serializedUser),
      error: null,
    };
  } catch (err) {
    return {
      isLoggedIn: false,
      user: null,
      error: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFail: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
      localStorage.removeItem("user");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    updateUserData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { loginSuccess, loginFail, logout, updateUserData } =
  authSlice.actions;
export default authSlice.reducer;
