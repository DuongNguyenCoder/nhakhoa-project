import { useParams, useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordSimple from "@/components/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const { type } = useParams(); // 'login', 'register', 'forgot'
  const navigate = useNavigate();

  const renderForm = () => {
    switch (type) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "forgot":
        return <ForgotPasswordSimple />;
      default:
        return <div>Không tìm thấy trang</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md my-8">
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthPage;
