import axios from 'axios';
import { logout } from '~/store/slices/authSlice';
// URL gốc của API (thay thế bằng URL backend của bạn)
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/auth`;

// Tạo một instance axios để dễ dàng cấu hình và sử dụng
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Đảm bảo rằng cookie được gửi với mỗi yêu cầu
  timeout: 10000,
});

const authApi = {
  // API đăng nhập
  login: (credentials) => {
    return axiosInstance.post('/login', credentials);
  },

  // API đăng ký
  register: (userInfo) => {
    return axiosInstance.post('/register', userInfo);
  },

  // API làm mới token
  refreshToken: () => {
    return axiosInstance.post('/refresh-token');
  },
  logout: () => {
    return axiosInstance.post('/logout');
  },
  sendVerifyCode: (email) => {
    return axiosInstance.post('/send-verify-code', { email });
  },
  verifyCode: (email, code) => {
    return axiosInstance.post('/verify-code', { email, code });
  },
  resetPassword: (email, password) => {
    return axiosInstance.post('/reset-password', { email, password });
  },
};

export default authApi;