import React, { useState, useEffect } from "react";
import { apiDeleteUserByAdmin, apiGetAllUsers } from "@/apis/adminAPI";
import {
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@/components/ui/Pagination";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UserManagement = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiGetAllUsers({
        page: currentPage,
        search: searchKeyword,
      });
      if (res.data?.success) {
        setUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } else {
        console.log("lỗi get all users.");
      }
    };
    fetchData();
  }, [currentPage, searchKeyword]);

  const handleDelete = async (id) => {
    apiDeleteUserByAdmin(id)
      .then((res) => {
        if (res.data?.success) {
          setUsers((e) => e.filter((user) => user._id !== id));
          toast.warning("Đã xóa!");
        } else {
          console.log("lỗi delete user by admin");
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        👨‍💻 Quản lý người dùng
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-6 flex w-full max-w-xl items-center gap-2 rounded-xl border bg-white p-4 shadow-sm">
        <Input
          placeholder="🔍 Tìm theo tên, email hoặc số điện thoại..."
          className="flex-1 border-none text-gray-700 placeholder-gray-400 focus:ring-0"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          onClick={() => setCurrentPage(1)}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Danh sách người dùng */}
      <div className="grid gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-lg border border-gray-200 p-6 shadow-lg transition hover:border-blue-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.profilePic || null}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                <span>{user.email}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-500" />
                <span>{user.mobile}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
                <span>{user.address}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => router.push(`/admin/users/preview/${user._id}`)}
                className="rounded-md bg-blue-100 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-200"
              >
                Xem chi tiết
              </button>
              <DeleteConfirmDialog onConfirm={() => handleDelete(user._id)}>
                <button className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700 transition hover:bg-red-200">
                  Xóa
                </button>
              </DeleteConfirmDialog>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="p-10 text-center text-gray-500">
          Không có người dùng nào.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserManagement;
