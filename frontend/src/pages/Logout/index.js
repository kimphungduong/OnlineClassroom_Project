import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAccount } from '~/store/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
  // Dispatch action để reset Redux store
  dispatch(logoutAccount()).unwrap().then(() => {
    // Chuyển hướng người dùng đến trang đăng nhập
    navigate('/login');
  }).catch((error) => {
    console.error('Error logging out:', error);
  });
  }, [dispatch]);
  return (
    <></>
  );
};

export default Logout;