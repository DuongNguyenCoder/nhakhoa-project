import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/appSlice";

const CartShopping = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.app.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )
 
  const handleClearCart = () => {
    dispatch(clearCart());
  }
  console.log("cart ITEMS: ", cartItems)
  return (
    <div className="mr-6 h-auto w-auto border-none sm:mr-4">
      <Menu>
        <MenuButton className="inline-flex items-center justify-center gap-x-2">
          <div className="relative">
            <ShoppingCartIcon className="size-6 sm:size-7" />
            <span
              id="soluong"
              className="absolute -right-1 -top-1 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            >
              {totalQuantity}
            </span>
          </div>
          <span className="hidden font-mono text-base sm:block">GIỎ HÀNG</span>
        </MenuButton>
        <MenuItems
          className={`absolute left-0 right-0 top-full z-40 
            origin-top-right rounded-b-lg border border-gray-200 
            bg-white p-2 shadow-lg transition-all duration-150 
            focus:outline-none md:left-auto md:right-5 md:w-[400px] lg:w-[435px]`}
        >
           {/* Nếu giỏ hàng trống */}
           {cartItems.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-600">
              Giỏ hàng của bạn đang trống
            </div>
          )}
          <div className="flex flex-col bg-gray-50">
            <div id="listproducts" className="w-full">
              {cartItems.length > 0 && (
                <div className=" relative flex flex-col group">
                  {cartItems.map((product) => (
                    <div 
                      key={product._id}
                      className="flex gap-1"
                    >
                      <img src={product.image} alt={product.title} className='h-[72px] w-[72px] rounded object-cover'/>
                      <div className="mx-2 flex-1 text-base">
                        <div className="font-normal mb-0.5 text-wrap text-[17px] text-gray-800">
                          {product.title}
                        </div>
                        <div className="text-red-600 font-medium">
                          {product.price}₫ <span className="text-black font-light">× {product.quantity}</span>
                        </div>
                      </div>
                      <XMarkIcon onClick={() => handleRemoveItem(product._id)} className="absolute top-2 right-2 size-5 group-hover:scale-105 hover:text-red-500 text-gray-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-full h-12 items-center justify-end gap-x-2 px-2 border-y-2 border-gray-300">
              TỔNG CỘNG:
              <strong className="text-base text-red-600">
                {totalPrice.toLocaleString()}đ
              </strong>
            </div>
            <div className="flex h-[80px] w-full items-center justify-between bg-gray-200 px-10 md:px-5">
              <a href="#">Xem Giỏ Hàng</a>
              <button className="h-12 w-[150px] items-center border-2 border-b-4 border-[#63a60d] border-b-[#487513] bg-[#71be0f] font-bold text-gray-100">
                <a href="#">ĐẶT HÀNG</a>
              </button>
            </div>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CartShopping;
