import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetCurrent, apiUpdateProfile } from "@/apis/userAPI";
import { setCurrentUser } from "@/redux/appSlice";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const dispatch = useDispatch();
  // Lấy dữ liệu user từ Redux (trong currentUser.data)
  const currentUser = useSelector((state) => state.app.currentUser);
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
        profilePic: currentUser.profilePic || "",
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
      console.log("API UPDATE PROFILE: ", res);

      if (res.data.success) {
        const updatedUser = await apiGetCurrent();
        dispatch(setCurrentUser(updatedUser.data.data));
        console.log("Đồng bộ profile thành công");
      } else {
        console.log("Lỗi rồi Đcm!");
      }
    } catch (err) {
      toast.error("Vui lòng chọn 1 Avartar bất kì để cập nhật!")
      console.error("Lỗi cập nhật profile:", err);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-2 max-w-3xl rounded-3xl bg-gradient-to-br from-pink-100 via-white to-blue-100 p-8 shadow-2xl ring-1 ring-white/60 backdrop-blur-lg"
    >
      <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-700 drop-shadow-lg">
        🌟 Cập nhật hồ sơ của bạn 🌟
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={preview || "/default-avatar.png"}
          alt="Avatar"
          className="h-28 w-28 rounded-full border-4 border-white shadow-xl ring-2 ring-indigo-400 transition hover:scale-105 hover:ring-pink-300"
        />
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleChange}
          className="text-sm font-medium text-indigo-700"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Họ tên *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            onChange={handleChange}
            className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 p-3 text-gray-500 shadow-inner"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 px-8 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl disabled:opacity-50"
        >
          {loading ? "💫 Đang cập nhật..." : "✨ Cập nhật hồ sơ ✨"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
