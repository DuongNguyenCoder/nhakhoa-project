"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter();
  const { width, height } = useWindowSize(); // Lấy kích thước cửa sổ

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 relative overflow-hidden">
      {/* Confetti pháo hoa */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />

      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex justify-center mb-6"
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaCheckCircle className="text-green-500 text-7xl" />
        </motion.div>
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Cảm ơn bạn đã đặt hàng!
        </h2>
        <p className="text-gray-600 mb-6">
          Đơn hàng của bạn đã được ghi nhận thành công. Chúng tôi sẽ liên hệ để
          xác nhận và giao hàng trong thời gian sớm nhất. 💚
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md transition"
          onClick={() => router.push("/")}
        >
          Về trang chủ
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
