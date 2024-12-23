import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RoleSelection from "../../components/RoleSelection";
import AgreementCheckbox from "../../components/AgreementCheckbox";

const RegisterPage = () => {
  const [role, setRole] = useState("student"); // Vai trò mặc định là học sinh
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
  });

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Hiển thị/Ẩn mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Xử lý khi nhấn nút "Đăng ký"
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.agree) {
      alert("Bạn cần đồng ý với các điều khoản để đăng ký.");
      return;
    }

    console.log("Đăng ký với thông tin:", form, "Vai trò:", role);

    if (role === "student") {
      alert("Đăng ký thành công cho học sinh!");
    } else if (role === "teacher") {
      alert("Đăng ký thành công cho giáo viên!");
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
        Đăng ký tài khoản
      </Typography>

      {/* Lựa chọn vai trò */}
      <RoleSelection role={role} onChange={(e) => setRole(e.target.value)} />

      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên người dùng"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <TextField
          label="Tên đăng nhập"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Box sx={{ position: "relative" }}>
          <TextField
            label="Mật khẩu"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <IconButton
            onClick={togglePasswordVisibility}
            sx={{ position: "absolute", right: 10, top: "25%" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        <AgreementCheckbox
          agree={form.agree}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Đăng ký
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Đã có tài khoản?{" "}
        <Button variant="text" color="primary">
          Đăng nhập
        </Button>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
