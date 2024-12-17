import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { getCourse, getLesson, getListCourse } from '~/services/courseService';
import { store } from '~/store'; // Import Redux store
import { logout, setTokens } from '~/store/slices/authSlice';
import { refreshToken } from '~/api/authApi';

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
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/course`, // Thay URL của bạn
  withCredentials: true, // Gửi cookie nếu cần
});

// Interceptor cho các yêu cầu trước khi gửi
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken');
    if (isTokenExpired(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
          token = response.data.accessToken;
          localStorage.setItem('accessToken', token);
          store.dispatch(setTokens({ accessToken: token }));
          isRefreshing = false;
          onAccessTokenRefreshed(token);
        } catch (error) {
          isRefreshing = false;
          store.dispatch(logout());
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
const courseApi = {
  // API đăng nhập
  getListCourse: () => {
    return axiosInstance.get('/');
  },

  // API đăng ký
  getCourse: (courseSlug) => {
    return axiosInstance.get(`/${courseSlug}`);
  },

  // API làm mới token
  getLesson: (courseSlug,lessonSlug) => {
    return axiosInstance.get(`/${courseSlug}/${lessonSlug}`);
  },
};

export default courseApi;