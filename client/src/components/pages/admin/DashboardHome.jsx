import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  UserGroupIcon,
  NewspaperIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import { apiGetAllUsers } from "@/apis/adminAPI";
import { apiGetNew } from "@/apis/NewsAPI";
import { apiGetAllOrder } from "@/apis/OdersAPI";
import { apiGetAllProduct } from "@/apis/ProductAPI";
import { useRouter } from "next/navigation";

const DashboardHome = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    apiGetAllProduct({ limit: 9999 }).then((rs) => {
      if (rs.data?.success) setProducts(rs.data.data);
    });

    apiGetAllOrder({ limit: 9999 }).then((rs) => {
      if (rs.data?.success) setOrders(rs.data.data);
    });

    apiGetNew({ limit: 9999 }).then((rs) => {
      if (rs.data?.success) setNews(rs.data.data);
    });

    apiGetAllUsers({ limit: 9999 }).then((rs) => {
      if (rs.data?.success) setUsers(rs.data.data);
    });
  }, []);

  const unpaidOrdersCount = orders.filter((o) => o.status === "UNPAID").length;

  const stats = [
    {
      title: "Sản phẩm",
      value: products.length,
      icon: <ShoppingBagIcon className="h-8 w-8 text-green-500" />,
      color: "green",
      path: "/admin/product",
    },
    {
      title: "Đơn hàng",
      value: orders.length,
      icon: <ClipboardDocumentListIcon className="h-8 w-8 text-blue-500" />,
      color: "blue",
      path: "/admin/orders",
      unpaid: unpaidOrdersCount,
    },
    {
      title: "Tin tức",
      value: news.length,
      icon: <NewspaperIcon className="h-8 w-8 text-amber-500" />,
      color: "amber",
      path: "/admin/news",
    },
    {
      title: "Người dùng",
      value: users.length,
      icon: <UserGroupIcon className="h-8 w-8 text-purple-500" />,
      color: "purple",
      path: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Tổng Quan Hệ Thống
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="relative flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Badge nếu có unpaid */}
            {item.unpaid > 0 && (
              <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 text-xs font-semibold text-white shadow">
                {item.unpaid} chưa xác nhận
              </span>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                {item.title}
              </h3>
              <p className={`mt-1 text-3xl font-bold text-${item.color}-600`}>
                {item.value}
              </p>
            </div>
            <div className="ml-4">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
