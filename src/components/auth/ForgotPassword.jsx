import { useState } from "react";
import { apiForgotPassword, apiCheckForgotPassCode, apiResetPassword } from "@/apis/userAPI";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiForgotPassword({email});
    console.log("STATE SEND CODE FORGOT PASSWORD: ", res.data.success)
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
    console.log("STATE RESET PASSWORD: ", resetRes)
    setLoading(false);
    if (resetRes?.data?.success) {
      toast.success("Đặt lại mật khẩu thành công. Hãy đăng nhập lại!");
      setStep(1);
    } else toast.error(resetRes.mes);
  };

  return (
    <div className="min-h-[350px] flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-100 p-4">
      <motion.div
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          {step === 1 ? "Quên mật khẩu?" : "Xác nhận & tạo mật khẩu mới"}
        </h2>

        <form onSubmit={step === 1 ? handleSendCode : handleResetPassword} className="space-y-4">
          {step === 1 ? (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Mã xác nhận</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Nhập mã từ email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Mật khẩu mới</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Đang xử lý..."
              : step === 1
              ? "Gửi mã xác nhận"
              : "Đặt lại mật khẩu"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
