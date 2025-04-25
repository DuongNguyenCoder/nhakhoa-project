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
    console.log("STATE SEND CODE FORGOT PASSWORD: ", res.data.success);
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
    console.log("STATE RESET PASSWORD: ", resetRes);
    setLoading(false);
    if (resetRes?.data?.success) {
      toast.success("Đặt lại mật khẩu thành công. Hãy đăng nhập lại!");
      setStep(1);
    } else toast.error(resetRes.mes);
  };

  return (
    <div className="min-h-[400px] flex items-center rounded-xl justify-center bg-gradient-to-tr from-purple-100 via-pink-100 to-yellow-100 p-4">
      <motion.div
        className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6 drop-shadow-sm">
          {step === 1 ? "🔐 Quên mật khẩu?" : "✅ Xác nhận & Tạo lại mật khẩu"}
        </h2>

        <form
          onSubmit={step === 1 ? handleSendCode : handleResetPassword}
          className="space-y-5"
        >
          {step === 1 ? (
            <div className="relative">
              <label className="block mb-2 font-medium text-gray-800">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-purple-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div className="relative">
                <label className="block mb-2 font-medium text-gray-800">
                  Mã xác nhận
                </label>
                <div className="relative">
                  <FiKey className="absolute top-3 left-3 text-purple-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                    placeholder="Nhập mã từ email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block mb-2 font-medium text-gray-800">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-purple-400" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                    placeholder="Mật khẩu mới"
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
            className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 disabled:opacity-60 shadow-md"
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
