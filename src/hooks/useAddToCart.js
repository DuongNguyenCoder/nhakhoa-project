import { setCartItems } from "@/redux/appSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const addToCart = async (product) => {
    const res = await apiUpdateCart({ product: product });
    console.log("API UPDATE CART: ", res);
    if (res?.data?.success) {
      dispatch(setCartItems(res.data.cart));
      toast.success(res.data.mes);
    } else {
      toast.error(res.data.mes);
    }
  };
  return addToCart;
};

export default useAddToCart;
