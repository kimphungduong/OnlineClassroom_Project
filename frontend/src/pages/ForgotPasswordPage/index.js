import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authApi from "~/api/authApi"; // Đường dẫn tới authApi.js

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.sendVerifyCode(email);
      setMessage("Mã xác thực đã được gửi đến email của bạn.");
      // Chuyển hướng sang trang VerifyCodePage và truyền email
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      setMessage("Không thể gửi mã xác thực. Vui lòng thử lại.");
    } finally {
      setLoading(false);
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
        Quên mật khẩu
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        gutterBottom
        sx={{ marginBottom: 3 }}
      >
        Chúng tôi sẽ gửi cho bạn một đường liên kết qua email để bạn có thể đặt lại mật khẩu của mình
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 2, textTransform: "none" }}
        >
          {loading ? "Đang gửi..." : "Đặt lại mật khẩu"}
        </Button>
      </form>
      {message && (
        <Typography
          variant="body2"
          color={message.includes("gửi") ? "green" : "red"}
          align="center"
          sx={{ marginTop: 2 }}
        >
          {message}
        </Typography>
      )}
      <Divider sx={{ margin: "20px 0" }}>khác</Divider>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          Đã có tài khoản?{" "}
          <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
            Đăng nhập
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
