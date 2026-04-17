import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignIn: false,
  currentUser: null,
  cartItems: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    setIsSignOut: (state) => {
      state.isSignIn = false;
      state.currentUser = null;
      state.cartItems = [];
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  setIsSignIn,
  setIsSignOut,
  setCurrentUser,
  setCartItems,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
