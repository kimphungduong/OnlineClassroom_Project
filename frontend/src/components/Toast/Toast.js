import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ message, severity, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Thời gian tự đóng (3 giây)
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Vị trí toast
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
