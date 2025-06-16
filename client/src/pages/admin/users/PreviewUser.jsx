import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  UserIcon,
  MapPinIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { apiGetUserById } from "@/apis/adminAPI";

const PreviewUser = () => {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    apiGetUserById(id)
        .then((res) => {
            console.log(res)
            if(res.data?.success){
                setDataUser(res.data.data);
            } else {
                console.log("Lỗi lấy dataUser by ID")
            }
        }).catch((err) => {
          console.log("Lỗi: ", err)
        });
  }, [id]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        👤 Chi tiết người dùng
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Ảnh đại diện */}
        <div className="col-span-1">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            <img
              src={dataUser.profilePic || "https://via.placeholder.com/150"}
              alt={dataUser.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {dataUser.name}
              </h2>
              <p className="text-sm text-gray-500">{dataUser.role}</p>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="col-span-2 space-y-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              📇 Thông tin cá nhân
            </h3>
            <InfoRow
              icon={<UserIcon className="h-5 w-5" />}
              label="Tên người dùng"
              value={dataUser.name}
            />
            <InfoRow
              icon={<EnvelopeIcon className="h-5 w-5" />}
              label="Email"
              value={dataUser.email}
            />
            <InfoRow
              icon={<DevicePhoneMobileIcon className="h-5 w-5" />}
              label="Số điện thoại"
              value={dataUser.mobile}
            />
            <InfoRow
              icon={<MapPinIcon className="h-5 w-5" />}
              label="Địa chỉ"
              value={dataUser.address || "Chưa cập nhật"}
            />
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-green-600">
              ⚙️ Thông tin hệ thống
            </h3>
            <InfoRow
              icon={<IdentificationIcon className="h-5 w-5" />}
              label="Mã người dùng"
              value={dataUser._id}
            />
            <InfoRow
              icon={<ShieldCheckIcon className="h-5 w-5" />}
              label="Vai trò"
              value={dataUser.role}
            />
            <InfoRow
              icon={<CalendarDaysIcon className="h-5 w-5" />}
              label="Ngày tạo"
              value={new Date(dataUser.createdAt).toLocaleString()}
            />
            <InfoRow
              icon={<CalendarDaysIcon className="h-5 w-5" />}
              label="Ngày cập nhật"
              value={new Date(dataUser.updatedAt).toLocaleString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="mb-2 flex items-center gap-3 text-sm text-gray-700">
    <div className="text-gray-500">{icon}</div>
    <span className="w-40 font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default PreviewUser;
