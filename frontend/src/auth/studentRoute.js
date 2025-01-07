import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const role = useSelector((state) => state.auth.role);

  // Kiểm tra nếu người dùng chưa đăng nhập hoặc không có quyền
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // Kiểm tra vai trò người dùng và đảm bảo đúng với vai trò yêu cầu
  if (role !== "student") {
    return <Navigate to="/teacher-course" />; // Nếu không có quyền, chuyển hướng về trang chính hoặc trang khác
  }
  return children;
};

export default StudentRoute;