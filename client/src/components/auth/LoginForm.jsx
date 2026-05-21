// src/components/LoginForm.jsx
import { useState } from "react";
import { apiGetCurrent, apiSignIn } from "@/apis/userAPI";
import { useNavigate } from "react-router-dom";
import { setIsSignIn, setCurrentUser } from "@/redux/appSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiSignIn(formData);
      if (res?.data?.success) {
        dispatch(setIsSignIn(true));
        const currentUserRes = await apiGetCurrent();
        if (currentUserRes?.data?.data) {
          console.log("CurrentUser: ", currentUserRes);
          dispatch(setCurrentUser(currentUserRes.data.data));
          if (currentUserRes.data.data.role === "ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác.");
      }
    } catch (err) {
      console.error("LỖI ĐĂNG NHẬP:", err);
      setError("Lỗi đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Đăng nhập vào tài khoản
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email hoặc Tên đăng nhập
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" />
            Ghi nhớ đăng nhập
          </label>
          <Link
            href="/auth/forgot"
            className="text-sm text-lime-600 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-lime-600 hover:bg-lime-700 text-white rounded-lg transition-all duration-200"
        >
          Đăng nhập
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Bạn chưa có tài khoản?{" "}
        <a href="/dang-ky" className="text-lime-600 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}
