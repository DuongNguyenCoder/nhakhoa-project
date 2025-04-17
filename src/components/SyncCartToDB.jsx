import { apiUpdateCart } from '@/apis/userAPI';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import _ from 'lodash';

const SyncCartToDB = () => {
    const itemsCart = useSelector((state) => state.app.cartItems);
    console.log("itemsCart redux: ", itemsCart)
    const isSignIn = useSelector((state) => state.app.isSignIn)

    // const debouncedUpdateCart  = useRef(
    //     _.debounce(async (cart) => {
    //         try {
    //         await apiUpdateCart({product: cart});
    //           console.log("Update cart thành công!", cart)
    //         } catch (err) {
    //           console.error("Lỗi update cart:", err);
    //         }
    //       }, 500)
    //     ).current;

    useEffect(() => {
        if(isSignIn){
            apiUpdateCart({ cart: itemsCart })
        }
    }, [itemsCart, isSignIn]);
  return null;
};

export default SyncCartToDB;
