import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "~/api/authApi"; // Đường dẫn tới authApi.js

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, token } = location.state || {}; // Nhận email và token từ trạng thái
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      // Gửi yêu cầu đổi mật khẩu kèm token
      const response = await authApi.resetPassword(token, password);
      setMessage(`Đổi mật khẩu thành công. ${response.data.message}`);
      setTimeout(() => navigate("/login"), 2000); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      setMessage("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 4,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Đặt lại mật khẩu
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        gutterBottom
        sx={{ marginBottom: 3 }}
      >
        Nhập mật khẩu mới cho tài khoản của bạn.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Xác nhận mật khẩu"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Đổi mật khẩu
        </Button>
      </form>
      {message && (
        <Typography
          variant="body2"
          color={message.includes("thành công") ? "green" : "red"}
          align="center"
          sx={{ marginTop: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ResetPasswordPage;
