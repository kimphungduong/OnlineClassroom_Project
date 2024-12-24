import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const role = useSelector((state) => state.auth.role);

  if (!accessToken || role !== 'student') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default StudentRoute;