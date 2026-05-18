"use client";

import AuthLayout from "@/layout/AuthLayout";
import CheckoutStep1 from "@/pages/checkout/CheckoutStep1";
import RouterLayout from "@/next/RouterLayout";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@/next/react-router-dom";
import { useSelector } from "react-redux";

export default function Page() {
  const { cartItems } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const originalTotalPrice = cartItems.reduce((sum, item) => {
    return sum + item.product.originalPrice * item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price =
      item.product.salePrice > 0
        ? item.product.salePrice
        : item.product.originalPrice;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="my-10 grid grid-cols-1 gap-6 bg-white p-6 md:grid-cols-2">
      {/* Left: Danh sách sản phẩm */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sản phẩm trong giỏ hàng</h2>
        {cartItems.map((item) => {
          const { originalPrice, salePrice, title, productPics, _id } =
            item.product;
          const discountPercent =
            originalPrice > 0 && salePrice > 0 && salePrice < originalPrice
              ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
              : 0;

          return (
            <div key={_id} className="flex items-center gap-3">
              <img
                src={productPics[0]}
                className="h-20 w-20 rounded object-cover"
                alt={title}
              />
              <div>
                <p>{title}</p>
                <p>Số lượng: {item.quantity}</p>
                <p>
                  Giá:{" "}
                  {salePrice > 0 ? (
                    <>
                      <span className="mr-1 text-sm line-through">
                        {originalPrice.toLocaleString()}₫
                      </span>
                      <span className="font-semibold text-red-500">
                        {salePrice.toLocaleString()}₫
                      </span>
                      {discountPercent > 0 && (
                        <span className="ml-2 text-sm text-green-600">
                          (-{discountPercent}%)
                        </span>
                      )}
                    </>
                  ) : (
                    <span>{originalPrice.toLocaleString()}₫</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Thông tin đơn hàng */}
      <div className="space-y-4 rounded border p-4 shadow">
        <h3 className="text-xl font-semibold">Thông tin đơn hàng</h3>
        <p>
          Tổng số sản phẩm: {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        </p>

        <p>
          Giá gốc:{" "}
          <span className="font-medium">
            {originalTotalPrice.toLocaleString()}₫
          </span>
        </p>

        <p>
          Giá sau khuyến mãi:{" "}
          <span className="font-semibold text-green-600">
            {totalPrice.toLocaleString()}₫
          </span>
        </p>

        <p className="text-sm italic text-yellow-600">
          * Phí giao hàng sẽ được báo lại sau khi xác nhận đơn hàng.
        </p>

        <div className="flex gap-1.5 text-lg font-bold">
          <span className="flex flex-col">
            <p>Tổng cộng:</p>
            <p className="font-normal text-base text-gray-600">
              (chưa bao gồm phí giao hàng)
            </p>
          </span>
          <p className="text-lg font-bold text-red-600 -ml-28">
            {totalPrice.toLocaleString()}₫
          </p>
        </div>

        <button
          onClick={() => navigate("/check-out-step2")}
          className={`rounded px-4 py-2 text-white ${
            cartItems.length === 0
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={cartItems.length === 0}
        >
          Tiếp tục
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-2 flex items-center gap-0.5"
      >
        <ArrowLeftStartOnRectangleIcon className="size-5" />
        <span className="text-sm">Tiếp tục mua hàng</span>
      </button>
    </div>
  );
}
