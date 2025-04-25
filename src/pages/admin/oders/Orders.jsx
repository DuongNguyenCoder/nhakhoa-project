import React, { useEffect, useState } from "react";
import {
  apiDeleteOrder,
  apiGetAllOrder,
  apiGetOneOrder,
  apiUpdateOrder,
} from "@/apis/OdersAPI";
import {
  MagnifyingGlassIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import Pagination from "@/components/ui/Pagination";

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
  CANCELLED: "text-gray-500 bg-gray-200",
};

const statusLabel = {
  UNPAID: "Chưa xác nhận",
  PAID: "Đã xác nhận",
  CANCELLED: "Đã hủy",
};

const statusOptions = [
  { label: "Tất cả", value: "ALL" },
  { label: "Chưa xác nhận", value: "UNPAID" },
  { label: "Đã xác nhận", value: "PAID" },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchUserId, setSearchUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ordersPerPage] = useState(10); // số lượng đơn mỗi trang
  const navigate = useNavigate();
  useEffect(() => {
    apiGetAllOrder({limit: 9999}).then((res) => {
      if (res?.data?.data){
        console.log("dsadsa",res)
        setOrders(res.data.data);
      } else {
        console.log("Lỗi get all Orders.");
      }
    });
  }, []);

  const filteredOrders = orders
    .filter((order) => filterStatus === "ALL" || order.status === filterStatus)
    .filter(
      (order) =>
        searchUserId.trim() === "" || order.orderBy._id === searchUserId.trim(),
    );

    // Phân trang sau khi đã lọc
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filteredOrders.length / ordersPerPage));
    setCurrentPage(1); // Reset về trang đầu khi lọc
  }, [filterStatus, searchUserId, orders]);

  const handleUpdateStatus = (id) => {
    apiGetOneOrder(id)
      .then((rs) => {
        if (rs.data && rs.data.success) {
          const order = rs.data.data;
          const updatedOrder = {
            status: "PAID",
            address: order.address,
            orderBy: order.orderBy,
            products: order.products.map((p) => ({
              product:
                typeof p.product === "string" ? p.product : p.product._id,
              quantity: p.quantity,
            })),
          };

          if (order.status !== "UNPAID") return;

          apiUpdateOrder(order._id, updatedOrder)
            .then((res) => {
              if (res.data && res.data.success) {
                // setOrder((prev) => ({ ...prev, status: "PAID" }));
                toast.success("Trạng thái đơn hàng đã được cập nhật!");
                setOrders((prevOrders) =>
                  prevOrders.map((o) =>
                    o._id === id ? { ...o, status: "PAID" } : o,
                  ),
                );
              } else {
                console.log("Lỗi update orders");
              }
            })
            .catch((err) => {
              console.log("Lỗi", err);
            });
        } else {
          console.log("Lỗi Get One Order.");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  const handleDelete = (id) => {
    apiDeleteOrder(id)
      .then((res) => {
        if (res.data?.success) {
          toast.warning("Đơn hàng đã được xóa thành công!");

          // Cập nhật state `orders` = lọc bỏ đơn hàng đã xóa
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== id),
          );
        } else {
          console.log("Lỗi deleteOrder.");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        📦 Quản lý đơn hàng
      </h1>

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                filterStatus === option.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-[300px]">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo ID người dùng..."
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="grid gap-6">
        {paginatedOrders.map((order) => (
          <div
            key={order._id}
            className="border-[2px] border-gray-200 px-4 py-6 text-gray-700"
          >
            {/* Mã đơn + Trạng thái + Thời gian */}
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 font-mono text-sm text-blue-600">
                <CubeIcon className="h-5 w-5 text-blue-500" />#{order._id}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                {formatDate(order.createdAt)}
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.status] || "bg-gray-200 text-gray-600"}`}
              >
                {statusLabel[order.status] || order.status}
              </div>
            </div>

            {/* Người đặt */}
            <div className="mb-1 flex items-center gap-2 text-sm">
              <UserIcon className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{order.orderBy?.name || "—"}</span>
              <span className="ml-2 text-xs text-gray-400">
                ID: {order.orderBy?._id || "—"}
              </span>
            </div>

            {/* Sản phẩm */}
            <div className="mb-1 text-sm text-gray-600">
              <span className="font-medium">{order.products.length}</span> sản
              phẩm • Tổng SL:{" "}
              <span className="font-medium">
                {order.products.reduce((acc, p) => acc + p.quantity, 0)}
              </span>
            </div>

            {/* Địa chỉ */}
            <div className="mb-2 flex items-start gap-2 text-sm text-gray-600">
              <MapPinIcon className="mt-0.5 h-4 w-4 text-gray-500" />
              <span className="truncate">{order.address}</span>
            </div>

            {/* Nút thao tác */}
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => navigate(`/admin/orders/preview/${order._id}`)}
                className="rounded-md bg-blue-100 px-4 py-1 text-sm text-blue-700 transition hover:bg-blue-200"
              >
                Xem
              </button>
              <button
                onClick={() => handleUpdateStatus(order._id)}
                className="rounded-md bg-yellow-100 px-4 py-1 text-sm text-yellow-700 transition hover:bg-yellow-200"
              >
                Cập nhật
              </button>

              <DeleteConfirmDialog onConfirm={() => handleDelete(order._id)}>
                <button className="rounded-md bg-red-100 px-4 py-1 text-sm text-red-700 transition hover:bg-red-200">
                  Xóa
                </button>
              </DeleteConfirmDialog>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="p-10 text-center text-gray-500">
          Không có đơn hàng phù hợp.
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}/>
    </div>
  );
};

export default Orders;
