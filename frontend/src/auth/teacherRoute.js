import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Sử dụng Redux để kiểm tra trạng thái đăng nhập và vai trò

const TeacherRoute = ({children}) => {
    const { accessToken, role } = useSelector((state) => state.auth); // Lấy thông tin từ Redux store
  
    // Kiểm tra nếu người dùng chưa đăng nhập hoặc không có quyền
    if (!accessToken) {
      return <Navigate to="/login" />;
    }
  
    // Kiểm tra vai trò người dùng và đảm bảo đúng với vai trò yêu cầu
    if (role !== "teacher") {
      return <Navigate to="/" />; // Nếu không có quyền, chuyển hướng về trang chính hoặc trang khác
    }
    return children;
};

export default TeacherRoute;