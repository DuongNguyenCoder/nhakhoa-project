import React, { useState } from "react";
import { apiSignUp } from "@/apis/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.email.trim()) err.email = "Email không được để trống";
    if (!formData.name.trim()) err.name = "Họ tên không được để trống";
    if (!formData.password) err.password = "Mật khẩu không được để trống";
    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Mật khẩu không khớp";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
      const payload = {
        email: formData.email.trim(),
        name: formData.name.trim(),
        password: formData.password,
      };
      const res = await apiSignUp(payload);
      console.log("RESPONSE API SIGN UP: ", res)
      if(res?.data?.success){
        toast.success(res.data.mes);
        navigate("/dang-nhap");
      } else {
        toast.error(res.data.mes);
      }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto shadow-lg p-4 space-y-4 bg-white rounded"
    >
      <h2 className="text-xl font-bold">Đăng ký tài khoản</h2>

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="text"
        placeholder="Họ tên"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default RegisterForm;
