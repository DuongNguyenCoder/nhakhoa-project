"use client";

import React, { useEffect, useState } from "react";
import {
  UserIcon,
  CubeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetOneOrder, apiUpdateOrder } from "@/apis/OdersAPI";
import { apiGetUserById } from "@/apis/adminAPI";
import { apiGetOneProduct } from "@/apis/ProductAPI";
import { toast } from "react-toastify";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusColor = {
  UNPAID: "text-red-600 bg-red-100",
  PAID: "text-green-600 bg-green-100",
  CANCELLED: "text-gray-600 bg-gray-200",
};

const statusLabel = {
  UNPAID: "Chưa xác nhận",
  PAID: "Đã xác nhận",
  CANCELLED: "Đã hủy",
};

export default function Page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState({});
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchOrder = () => {
      apiGetOneOrder(id)
        .then((res) => {
          if (res.data && res.data.success) {
            const orderData = res.data.data;
            console.log("orderdata: ", orderData);
            setOrder(orderData);

            apiGetUserById(orderData.orderBy)
              .then((rs) => {
                console.log("Data user: ", rs);
                if (rs.data && rs.data.success) {
                  setUser(rs.data.data);
                } else {
                  console.log("Lỗi apiGetUserById.");
                }
              })
              .catch((err) => {
                console.log("Lỗi khi gọi apiGetUserById: ", err);
              });
          } else {
            console.log("Lỗi getOneOrder: Không thành công.");
          }
        })
        .catch((err) => {
          console.log("Lỗi khi gọi apiGetOneOrder: ", err);
        });
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!order || !order.products) return;

    const promises = order.products.map((item) =>
      apiGetOneProduct(item.product).then((res) => res.data.data),
    );

    Promise.all(promises)
      .then((productsData) => {
        const fullProducts = order.products.map((item, index) => ({
          ...item,
          product: productsData[index], // Gán chi tiết sản phẩm từ API
        }));

        setProduct(fullProducts);
      })
      .catch((error) => {
        console.log("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, [order]);
  console.log("products: ", user);
  const handleUpdateStatus = () => {
    if (order.status !== "UNPAID") return;

    const updatedOrder = {
      status: "PAID",
      address: order.address,
      orderBy: order.orderBy,
      products: order.products.map((p) => ({
        product: typeof p.product === "string" ? p.product : p.product._id,
        quantity: p.quantity,
      })),
    };

    apiUpdateOrder(order._id, updatedOrder)
      .then((res) => {
        if (res.data && res.data.success) {
          setOrder((prev) => ({ ...prev, status: "PAID" }));
          toast.success("Trạng thái đơn hàng đã được cập nhật!");
        } else {
          console.log("Lỗi update orders");
        }
      })
      .catch((err) => {
        console.log("Lỗi", err);
      });
  };
  if (!order) {
    return <div className="p-6 text-gray-500">Đang tải đơn hàng...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6 text-gray-700">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        🧾 Chi tiết đơn hàng
      </h1>

      {/* Mã đơn & Trạng thái */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-sm text-blue-600">
          <CubeIcon className="h-5 w-5 text-blue-500" />
          <span>Mã đơn: #{order._id}</span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColor[order.status] || "bg-gray-200 text-gray-600"
          }`}
        >
          {statusLabel[order.status] || order.status}
        </span>
      </div>

      {/* Người đặt */}
      <div className="mb-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <UserIcon className="h-5 w-5 text-gray-500" />
          Người đặt
        </h2>

        <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 shadow-sm">
            <UserIcon className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">{user.name || "—"}</p>
              <p className="text-xs text-gray-500">Tên người đặt</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-sm font-bold text-white">
              #
            </span>
            <div>
              <p className="font-medium">{user._id || "—"}</p>
              <p className="text-xs text-gray-500">Mã người dùng</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 shadow-sm">
            <svg
              className="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 5h2l3.6 7.59-1.35 2.44C7.16 16.37 8.23 18 9.7 18H19v-2H9.7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0022 5H6.21L5.27 3H1v2h2l3.6 7.59L5.25 14C4.52 15.37 5.59 17 7.06 17H19v-2H7.06l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L22 6H6.21l-.94-2H3z" />
            </svg>
            <div>
              <p className="font-medium">{user.mobile || "—"}</p>
              <p className="text-xs text-gray-500">Số điện thoại</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
          📦 Danh sách sản phẩm
        </h2>
        <div className="overflow-hidden rounded-lg border border-blue-200 shadow-sm">
          {product.map((item, index) => {
            const quantity = item.quantity || 0;
            const prod = item.product || {};
            const price = prod.salePrice || prod.originalPrice || 0;
            return (
              <div
                key={prod._id || index}
                className="flex items-center justify-between divide-y divide-blue-100 px-4 py-3 transition hover:bg-blue-50"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {prod.title || "Sản phẩm không xác định"}
                  </p>
                  <p className="text-sm text-gray-500">Số lượng: {quantity}</p>
                </div>
                <div className="text-right text-sm text-gray-700">
                  <p className="">Giá: {price.toLocaleString("vi-VN")}₫</p>
                  <p className="font-semibold text-blue-600">
                    Tổng: {(price * quantity).toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid-cols mt-5 grid gap-4 text-sm font-medium text-gray-700">
          <div className="flex gap-3">
            <span>Tổng sản phẩm:</span>
            <span className="text-gray-900">{product.length}</span>
          </div>
          <div className="flex gap-3">
            <span>Tổng số lượng:</span>
            <span className="text-gray-900">
              {product.reduce((acc, item) => acc + (item.quantity || 0), 0)}
            </span>
          </div>
          <div className="mt-3 flex gap-3 border-t pt-3 text-base font-semibold text-blue-700">
            <span>Tổng thanh toán:</span>
            <span>
              {product
                .reduce((acc, item) => {
                  const price =
                    item.product?.salePrice || item.product?.originalPrice || 0;
                  return acc + price * (item.quantity || 0);
                }, 0)
                .toLocaleString("vi-VN")}
              ₫
            </span>
          </div>
        </div>
      </div>

      {/* Địa chỉ */}
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
          Địa chỉ nhận hàng
        </h2>
        <p className="text-sm text-gray-700">{order.address || "—"}</p>
      </div>

      {/* Ngày đặt */}
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          Ngày đặt hàng
        </h2>
        <p className="text-sm text-gray-700">{formatDate(order.createdAt)}</p>
      </div>

      {/* Nút hành động */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => handleUpdateStatus(order._id)}
          className="rounded-md bg-blue-100 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-200"
        >
          Cập nhật trạng thái
        </button>
        <button
          onClick={() => navigate("/admin/orders")}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-200"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
