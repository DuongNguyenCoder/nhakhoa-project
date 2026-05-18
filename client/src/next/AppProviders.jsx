"use client";

import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "@/redux/store";
import { setCartItems } from "@/redux/appSlice";

function CartSync() {
  const { currentUser } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.cart) {
      dispatch(setCartItems(currentUser.cart));
    }
  }, [currentUser?.cart, dispatch]);

  return null;
}

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartSync />
        {children}
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
