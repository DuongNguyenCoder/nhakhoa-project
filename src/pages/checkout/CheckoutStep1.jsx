import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutStep1 = () => {
  const { cartItems } = useSelector((state) => state.app);
  const navigate = useNavigate();

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
        {cartItems.map((item) => (
          <div key={item.product._id} className="flex items-center gap-3">
            <img
              src={item.product.productPics[0]}
              className="h-20 w-20 rounded object-cover"
            />
            <div>
              <p>{item.product.title}</p>
              <p>Số lượng: {item.quantity}</p>
              <p>
                Giá:{" "}
                {item.product.salePrice > 0 ? (
                  <>
                    <span className="mr-1 text-sm line-through">
                      {item.product.originalPrice.toLocaleString()}₫
                    </span>
                    <span className="text-red-500">
                      {item.product.salePrice.toLocaleString()}₫
                    </span>
                  </>
                ) : (
                  <span>{item.product.originalPrice.toLocaleString()}₫</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Thông tin đơn hàng */}
      <div className="space-y-4 rounded border p-4 shadow">
        <h3 className="text-xl font-semibold">Thông tin đơn hàng</h3>
        <p>
          Tổng số sản phẩm: {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        </p>

        <p>
          Tổng giá gốc:{" "}
          {cartItems
            .reduce((sum, i) => sum + i.product.originalPrice * i.quantity, 0)
            .toLocaleString()}
          ₫
        </p>

        <p>Tạm tính (đã áp dụng giảm): {totalPrice.toLocaleString()}₫</p>

        <p className="text-lg font-bold">
          Tổng cộng: {totalPrice.toLocaleString()}₫
        </p>

        <button
          onClick={() => navigate("/check-out-step2")}
          className={`rounded px-4 py-2 text-white ${
            cartItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
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
};

export default CheckoutStep1;
