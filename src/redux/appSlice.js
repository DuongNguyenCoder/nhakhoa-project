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
    updateCartItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === product._id,
      );

      if (existingIndex !== -1) {
        state.cartItems[existingIndex].quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
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
  updateCartItemQuantity,
  addToCart,
  removeFromCart,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
