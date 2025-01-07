import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from '~/store/slices/authSlice'; // Import hành động login
import { useNavigate } from 'react-router-dom';
import LoginForm from '~/components/Login';
import { Typography } from '@mui/material';
import {store} from '~/store'; // Import Redux store

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Lưu thông báo lỗi
  const [loading, setLoading] = useState(false); // Hiển thị trạng thái loading

  const handleSubmit = async (form) => {
    setError(""); // Reset thông báo lỗi
    setLoading(true); // Hiển thị trạng thái loading

    try {
      // Gửi yêu cầu login qua Redux Thunk
      await dispatch(login({ username: form.username, password: form.password })).unwrap(); // unwrap để nhận giá trị trả về và catch lỗi
      console.log('Login successful');
      if ( store.getState().auth.role === 'teacher') {
        navigate('/teacher-course'); // Chuyển hướng về trang giáo viên
      } else {
        navigate('/'); // Chuyển hướng về trang học viên
      }
    } catch (err) {
      setError(err.message); // Hiển thị lỗi nếu đăng nhập thất bại
    }
    setLoading(false); // Ẩn trạng thái loading
  };

  return (
    <>
      <LoginForm handleSubmit={handleSubmit}/>
      {error && (
        <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default LoginPage;
