// src/auth/StudentRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return token && role === 'student' ? children : <Navigate to="/login" />;
};

export default StudentRoute;
