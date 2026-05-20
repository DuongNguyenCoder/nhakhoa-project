// import LoginForm from "@/components/auth/LoginForm";
// import RegisterForm from "@/components/auth/RegisterForm";
// import ForgotPasswordSimple from "@/components/auth/ForgotPassword";
// import { motion } from "framer-motion";
// import { ToastContainer } from "react-toastify";
// import { useParams } from "next/navigation";

// const AuthPage = () => {
//   const params = useParams(); // 'login', 'register', 'forgot'
//   const type = params?.type || "login";
//   // const navigate = useNavigate();

//   const renderForm = () => {
//     switch (type) {
//       case "login":
//         return <LoginForm />;
//       case "register":
//         return <RegisterForm />;
//       case "forgot":
//         return <ForgotPasswordSimple />;
//       default:
//         return <div>Không tìm thấy trang</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <motion.div
//         className="w-full max-w-md my-8 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {renderForm()}
//       </motion.div>
//       <ToastContainer />
//     </div>
//   );
// };

export default function AuthPage() {
  return <div>test</div>;
}
