import { useParams, useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
// import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthPage = () => {
  const { type } = useParams(); // 'login', 'register', 'forgot'
  const navigate = useNavigate();

  const renderForm = () => {
    switch (type) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      // case "forgot":
      //   return <ForgotPasswordForm />;
      default:
        return <div>Không tìm thấy trang</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthPage;
