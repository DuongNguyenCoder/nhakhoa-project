import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCartItems } from "./redux/appSlice";
import SupportWidget from "./components/SupportWidget";

function App() {
  
  const {currentUser} = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    if(currentUser?.cart){
      dispatch(setCartItems(currentUser.cart));
    }
  }, [currentUser?.cart, dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
