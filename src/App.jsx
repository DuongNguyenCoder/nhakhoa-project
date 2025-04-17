import { BrowserRouter } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import TopHeader from "./components/TopHeader";
import "./index.css";
import HomeLayout from "./layout/HomeLayout";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { apiGetCurrent, apiUpdateCart } from "@/apis/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setCurrentUser, setIsSignIn } from "./redux/appSlice";
import { ToastContainer } from "react-toastify";
import SyncCartToDB from "./components/SyncCartToDB";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiGetCurrent();
        console.log("API GET CURRENT: ", res.data.data.cart);
        if (res?.data?.data?._id) {
          dispatch(setIsSignIn(true));
          dispatch(setCurrentUser(res.data.data));
          dispatch(setCartItems(res.data.data.cart));
        }
      } catch (err) {
        // Không cần xử lý nếu chưa đăng nhập
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
