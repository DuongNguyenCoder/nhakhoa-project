import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateProfile } from "@/apis/userAPI";
import { setCurrentUser } from "@/redux/appSlice";

const ProfileForm = () => {
  const dispatch = useDispatch();
  // Lấy dữ liệu user từ Redux (trong currentUser.data)
  const currentUser = useSelector((state) => state.app.currentUser?.data);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    profilePic: null,
  });
  const [preview, setPreview] = useState("");

  //đồng bộ data từ redux vô form
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        mobile: currentUser.mobile || "",
        address: currentUser.address || "",
        profilePic: null,
      });

      setPreview(currentUser.profilePic || "");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files[0]) {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      if (formData.mobile) submitData.append("mobile", formData.mobile);
      if (formData.address) submitData.append("address", formData.address);

      // Chỉ append profilePic nếu có file mới
      if (formData.profilePic instanceof File) {
        submitData.append("profilePic", formData.profilePic);
      }

      const res = await apiUpdateProfile(submitData);
      const updatedUser = res?.data?.data;
      console.log("TEST UPDATE: ", res.data.data);

      if (updatedUser) {
        dispatch(setCurrentUser(updatedUser));
        alert("Cập nhật thành công!");
      } else {
        alert("Dữ liệu trả về không hợp lệ.");
      }
    } catch (err) {
      console.error("Lỗi cập nhật profile:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  if (!currentUser) {
    return (
      <div className="p-6 text-center text-gray-500">
        Đang tải thông tin người dùng...
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-5 rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="text-center text-xl font-bold text-gray-800">
        Cập nhật hồ sơ
      </h2>

      <div className="flex flex-col items-center gap-2">
        <img
          src={preview || "/default-avatar.png"} // Fallback nếu không có preview
          alt="Avatar"
          className="h-24 w-24 rounded-full border object-cover"
        />
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleChange}
          className="text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Họ tên *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="pt-3 text-center">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
