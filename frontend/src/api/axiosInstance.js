import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { store } from '~/store'; // Import Redux store
import { logout, setTokens } from '~/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


let isRefreshing = false;
let refreshSubscribers = [];

// Hàm thêm yêu cầu chờ token mới
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Thông báo cho các yêu cầu đang chờ khi token mới có sẵn
const onAccessTokenRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Kiểm tra token có hết hạn không
const isTokenExpired = (token) => {
  if (!token) return true; // Nếu không có token, xem như đã hết hạn
  const { exp } = jwtDecode(token); // Decode token để lấy thời gian hết hạn
  return Date.now() >= exp * 1000; // So sánh thời gian hiện tại với thời gian hết hạn
};

// Tạo Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`, // Thay URL của bạn
  withCredentials: true, // Gửi cookie nếu cần
});

// Interceptor cho các yêu cầu trước khi gửi
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = store.getState().auth.accessToken;
    let role = store.getState().auth.role;
    if (isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
          token = response.data.accessToken;
          role = response.data.role;
          // localStorage.setItem('accessToken', token);
          // localStorage.setItem('role', role);
          store.dispatch(setTokens({ accessToken: token, role }));
          isRefreshing = false;
          onAccessTokenRefreshed(token);
        } catch (error) {
          isRefreshing = false;
          // try {
          //   await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
          // } catch (error) {
          //   console.log('Error during logout:', error);
          // }
          const dispatch = useDispatch();
          dispatch(logout());
          
          // localStorage.clear();
          // window.location.reload();
            var navigate = useNavigate();
            navigate('/login');
          throw error;
        }
      }
      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(config);
        });
      });
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;