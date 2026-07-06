"use client";

import { apiAddOrder } from "@/apis/OdersAPI";
import { apiClearCard, apiGetCurrent } from "@/apis/userAPI";
import { setCurrentUser } from "@/redux/appSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.app);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    addressType: "Nhà riêng",
  });

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0,
  );
  const totalSalePrice = cartItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0,
  );
  console.log("Thông tin đặt hàng:", form);
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    if (!form.fullName || !form.phone || !form.address) {
      toast.error("Vui lòng nhập đầy đủ thông tin giao hàng");
      return;
    }
    const orderData = {
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      orderBy: currentUser._id,
      address: form.address,
    };
    const res = await apiAddOrder(orderData);
    if (res?.data?.success) {
      console.log("API ODERS: ", res);
      router.push("/thank-you");
      const resClearCart = await apiClearCard();
      console.log("resClearCart: ", resClearCart);
      if (resClearCart.data.success) {
        const userRes = await apiGetCurrent();
        if (userRes?.data?.data) {
          dispatch(setCurrentUser(userRes.data.data));
        }
      }
    } else {
      console.log("Lỗi rồi con ạ!");
    }
  };
  return (
    // <RouterLayout layout={AuthLayout}>
    <div className="container mx-auto grid grid-cols-1 gap-8 p-6 my-16 md:grid-cols-2">
      {/* Left: Form Thông tin giao hàng */}
      <div className="space-y-5 rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold text-green-700">
          Thông tin giao hàng
        </h2>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleInputChange}
          placeholder="Họ và tên"
          className="w-full rounded-lg border p-3"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleInputChange}
          placeholder="Số điện thoại"
          className="w-full rounded-lg border p-3"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleInputChange}
          placeholder="Địa chỉ nhận hàng"
          className="w-full rounded-lg border p-3"
        />
        <select
          name="addressType"
          value={form.addressType}
          onChange={handleInputChange}
          className="w-full rounded-lg border p-3"
        >
          <option>Nhà riêng</option>
          <option>Công ty</option>
          <option>Khác</option>
        </select>
      </div>

      {/* Right: Chi tiết đơn hàng */}
      <div className="space-y-6 rounded-2xl border bg-gray-50 p-6 shadow">
        <h3 className="mb-4 text-2xl font-bold text-green-700">
          Đơn hàng của bạn
        </h3>

        {/* Danh sách sản phẩm */}
        <div className="max-h-[300px] space-y-4 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center gap-4 border-b pb-3"
            >
              <img
                src={item.product.productPics[0]}
                alt={item.product.title}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-gray-600">
                  Giá:{" "}
                  <span className="text-red-500">
                    {item.product.salePrice.toLocaleString()}₫
                  </span>{" "}
                  × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tổng kết */}
        <div className="space-y-2 border-t pt-4 text-base">
          <p>
            Tổng sản phẩm: <strong>{totalQuantity}</strong>
          </p>
          <p className="text-yellow-600 text-sm italic">
            * Phí giao hàng sẽ được báo lại sau khi xác nhận đơn hàng.
          </p>
          <div className="flex gap-1.5 text-lg font-bold">
            <span className="flex flex-col">
              <p>Tổng cộng:</p>
              <p className="font-normal text-base text-gray-700">
                (chưa bao gồm phí giao hàng)
              </p>
            </span>
            <p className="text-lg font-bold text-red-600 -ml-28">
              {totalSalePrice.toLocaleString()}₫
            </p>
          </div>
        </div>

        <button
          onClick={handleOrderSubmit}
          className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          Tiến hành đặt hàng
        </button>
      </div>
    </div>
    // </RouterLayout>
  );
}
