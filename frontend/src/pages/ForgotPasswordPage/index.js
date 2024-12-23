import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Đặt lại mật khẩu cho email:", email);
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
      {/* Tiêu đề */}
      <Typography variant="h4" align="center" gutterBottom>
        Quên mật khẩu
      </Typography>

      {/* Mô tả */}
      <Typography
        variant="body2"
        align="center"
        color="textSecondary"
        gutterBottom
        sx={{ marginBottom: 3 }}
      >
        Chúng tôi sẽ gửi cho bạn một đường liên kết qua email để bạn có thể đặt lại mật khẩu của mình
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Trường nhập email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={email}
          onChange={handleChange}
        />

        {/* Nút đặt lại mật khẩu */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, textTransform: "none" }}
        >
          Đặt lại mật khẩu
        </Button>
      </form>

      {/* Dòng phân cách */}
      <Divider sx={{ margin: "20px 0" }}>khác</Divider>

      {/* Đăng nhập */}
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
