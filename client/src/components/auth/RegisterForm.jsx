import React, { useState } from "react";
import { apiSignUp } from "@/apis/userAPI";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.email.trim()) err.email = "Email không được để trống";
    if (!formData.name.trim()) err.name = "Họ tên không được để trống";
    if (!formData.mobile.trim()) {
      err.mobile = "Số điện thoại không được để trống";
    } else if (!/^0\d{9}$/.test(formData.mobile.trim())) {
      err.mobile = "Số điện thoại không hợp lệ";
    }
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
      mobile: formData.mobile.trim(),
    };

    apiSignUp(payload)
      .then((res) => {
        console.log("RESPONSE API SIGN UP: ", res);
        if (res?.data?.success) {
          toast.success(res.data.mes);
          router.push("/dang-nhap");
        } else {
          toast.error(res.response.data.mes);
        }
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center py-10 px-4"
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl border-amber-200 border rounded-3xl">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-amber-700 drop-shadow">
            Đăng ký tài khoản
          </h2>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-amber-50 focus:ring-2 focus:ring-amber-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Họ tên"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-amber-50 focus:ring-2 focus:ring-amber-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Số điện thoại"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              className="bg-amber-50 focus:ring-2 focus:ring-amber-400"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-amber-50 focus:ring-2 focus:ring-amber-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="bg-amber-50 focus:ring-2 focus:ring-amber-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 text-lg font-semibold rounded-xl shadow-lg"
          >
            Đăng ký
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegisterForm;
