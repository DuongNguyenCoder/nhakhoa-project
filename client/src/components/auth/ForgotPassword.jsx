import { useState } from "react";
import {
  apiForgotPassword,
  apiCheckForgotPassCode,
  apiResetPassword,
} from "@/apis/userAPI";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiMail, FiKey, FiLock } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiForgotPassword({ email });
    setLoading(false);
    if (res?.data?.success) {
      toast.success(res.data.mes);
      setStep(2);
    } else toast.error(res.data.mes);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const checkRes = await apiCheckForgotPassCode({ email, code });
    if (!checkRes?.data?.success) {
      setLoading(false);
      return toast.error(checkRes.mes);
    }
    const resetRes = await apiResetPassword({ email, password });
    setLoading(false);
    if (resetRes?.data?.success) {
      toast.success("Đặt lại mật khẩu thành công. Hãy đăng nhập lại!");
      setStep(1);
    } else toast.error(resetRes.mes);
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4 bg-gray-100 rounded-xl">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          {step === 1 ? "🔒 Quên mật khẩu?" : "✅ Xác nhận & Đổi mật khẩu"}
        </h2>

        <form
          onSubmit={step === 1 ? handleSendCode : handleResetPassword}
          className="space-y-5"
        >
          {step === 1 ? (
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-red-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Mã xác nhận
                </label>
                <div className="relative">
                  <FiKey className="absolute top-3 left-3 text-red-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
                    placeholder="Nhập mã xác nhận từ email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-red-400" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
                    placeholder="Nhập mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Đang xử lý...</span>
            ) : step === 1 ? (
              <>
                <FaRegPaperPlane /> Gửi mã xác nhận
              </>
            ) : (
              "Đặt lại mật khẩu"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
