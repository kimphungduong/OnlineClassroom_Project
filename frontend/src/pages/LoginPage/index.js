import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Đăng nhập với thông tin:", form);
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
        Đăng nhập tài khoản
      </Typography>

      {/* Form đăng nhập */}
      <form onSubmit={handleSubmit}>
        {/* Tên đăng nhập */}
        <TextField
          label="Tên đăng nhập"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={form.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: !form.username && (
              <Box
                component="img"
                src="/assets/images/user-icon.png" // Đường dẫn tới hình ảnh icon
                alt="User"
                sx={{ width: 24, marginRight: 1 }}
              />
            ),
          }}
        />

        {/* Mật khẩu */}
        <Box sx={{ position: "relative" }}>
          <TextField
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: !form.password && (
                <Box
                  component="img"
                  src="/assets/images/password-icon.png" // Đường dẫn tới hình ảnh icon
                  alt="Password"
                  sx={{ width: 24, marginRight: 1 }}
                />
              ),
            }}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{ position: "absolute", right: 10, top: "30%" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        {/* Nút Đăng nhập */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, textTransform: "none" }}
        >
          Đăng nhập
        </Button>
      </form>

      {/* Dòng phân cách */}
      <Divider sx={{ margin: "20px 0" }}>khác</Divider>

      {/* Các nút mạng xã hội */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {/* Facebook */}
        <IconButton>
          <Box
            component="img"
            src="/assets/images/facebook-logo.png" // Đường dẫn tới logo Facebook
            alt="Facebook"
            sx={{ width: 32 }}
          />
        </IconButton>

        {/* Gmail */}
        <IconButton>
          <Box
            component="img"
            src="/assets/images/gmail-logo.png" // Đường dẫn tới logo Gmail
            alt="Gmail"
            sx={{ width: 32 }}
          />
        </IconButton>

        {/* Google */}
        <IconButton>
          <Box
            component="img"
            src="/assets/images/google-logo.png" // Đường dẫn tới logo Google
            alt="Google"
            sx={{ width: 32 }}
          />
        </IconButton>
      </Box>

      {/* Quên mật khẩu và Đăng ký */}
      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <Typography variant="body2" gutterBottom>
          <Button variant="text" sx={{ textTransform: "none" }}>
            Quên mật khẩu
          </Button>
        </Typography>
        <Typography variant="body2">
          Không có tài khoản?{" "}
          <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
            Đăng ký
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
