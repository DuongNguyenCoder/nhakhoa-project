import { BrowserRouter } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import TopHeader from './components/TopHeader'
import './index.css'
import HomeLayout from './layout/HomeLayout'
import AppRouter from './routes/AppRouter'
import { useEffect } from 'react'
import { apiGetCurrent } from '@/apis/userAPI'
import { useDispatch } from 'react-redux'
import { setCurrentUser, setIsSignIn } from './redux/appSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiGetCurrent();
        console.log("API GET CURRENT: ", res.data.data)
        if (res?.data?._id) {
          dispatch(setIsSignIn(true));
          dispatch(setCurrentUser(res.data.data));
        }
      } catch (err) {
        // Không cần xử lý nếu chưa đăng nhập
      }
    };

    fetchUser();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
