// filepath: /d:/phuc/NMCNPM/CSC13002_Intro-to-SE/frontend/src/pages/Login/index.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '~/store/slices/authSlice'; // Import hành động login
import LoginForm from '~/layouts/components/Login/LoginForm'; // Import LoginForm
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State lưu lỗi khi đăng nhập

  const handleLogin = async (credentials) => {
    try {
      // Gửi yêu cầu login qua Redux Thunk
      await dispatch(login(credentials)).unwrap(); // unwrap để nhận giá trị trả về và catch lỗi
      console.log('Login successful');
      navigate('/watch'); // Chuyển hướng về trang chủ
    } catch (error) {
      setError(error.message || 'Login failed'); // Hiển thị thông báo lỗi nếu có
      console.error('Login failed', error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default Login;
