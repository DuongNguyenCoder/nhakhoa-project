// src/pages/NotFound.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-50 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">

      {/* Vòng tròn hiệu ứng nền */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 3 }}
        transition={{ duration: 5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full opacity-30"
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-[120px] font-extrabold text-red-500 drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-2xl md:text-3xl font-semibold text-gray-800"
      >
        Ôi không! Trang không tồn tại...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-4 text-gray-500"
      >
        Bạn sẽ được chuyển về trang chủ sau vài giây.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium shadow-md transition"
      >
        Quay về trang chủ
      </motion.button>
    </div>
  );
};

export default NotFound;
