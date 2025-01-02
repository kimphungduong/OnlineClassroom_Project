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
import { useDispatch } from 'react-redux';
import { login } from '~/store/slices/authSlice'; // Import hành động login
import { useNavigate } from 'react-router-dom';
import showToast from '~/components/Toast/Toast'; // Import hàm hiển thị toast

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // Lưu thông báo lỗi
  const [loading, setLoading] = useState(false); // Hiển thị trạng thái loading

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset thông báo lỗi
    setLoading(true); // Hiển thị trạng thái loading

    try {
      // Gửi yêu cầu login qua Redux Thunk
      const response = await dispatch(login({username: form.username, password: form.password})).unwrap(); // unwrap để nhận giá trị trả về và catch lỗi
      if (response.error) {
        throw new Error(response.payload.message); // Nếu có lỗi, ném lỗi để bắt ở khối catch
      }
      console.log('Login successful');
      navigate('/'); // Chuyển hướng về trang chủ
    } catch (err) {
      setError(err.message); // Hiển thị lỗi nếu đăng nhập thất bại
      showToast('This is a success message!', 'success');
    }
    setLoading(false); // Ẩn trạng thái loading
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

      {/* Thông báo lỗi */}
      {error && (
        <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

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
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, textTransform: "none" }}
          disabled={loading} // Vô hiệu hóa nút khi đang loading
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </Button>
      </form>

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

export default LoginPage;
