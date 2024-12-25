import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";

const LoginForm = ({ handleSubmit }) => {
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

  const onSubmit = () => {
    handleSubmit(form); // Gọi hàm handleSubmit với form data khi nút Đăng nhập được nhấn
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 4, border: "1px solid #ddd", borderRadius: 2, boxShadow: 3 }}>
      {/* Tiêu đề */}
      <Typography variant="h4" align="center" gutterBottom>
        Đăng nhập tài khoản
      </Typography>

      {/* Tên đăng nhập */}
      <TextField
        label="Tên đăng nhập"
        variant="outlined"
        fullWidth
        margin="normal"
        name="username"
        value={form.username}
        onChange={handleChange}
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
        onClick={onSubmit} // Thay vì form, sử dụng onClick để gọi handleSubmit
        variant="contained"
        fullWidth
        sx={{ marginTop: 2, textTransform: "none" }}
      >
        Đăng nhập
      </Button>

      {/* Dòng phân cách */}
      <Divider sx={{ margin: "20px 0" }}>khác</Divider>

      {/* Nút đăng nhập bằng Google */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          sx={{ textTransform: "none" }}
        >
          Đăng nhập bằng Google
        </Button>
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

export default LoginForm;
