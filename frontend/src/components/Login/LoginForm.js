import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student"); // Mặc định là học sinh
  const [error, setError] = useState(""); // Lưu lỗi nếu có

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Xóa lỗi trước khi đăng nhập

    // Mock gửi thông tin đăng nhập
    try {
      console.log("Đăng nhập với thông tin:");
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Role:", role);

      // Gửi thông tin tới backend (giả lập API call)
      const response = await mockApiLogin({ email, password, role });

      if (response.status === 200) {
        alert(`Đăng nhập thành công với tư cách: ${role}`);
      } else {
        setError(response.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  // Giả lập API đăng nhập
  const mockApiLogin = async ({ email, password, role }) => {
    // Mô phỏng backend: Kiểm tra vai trò và trả kết quả
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "student@example.com" && role === "student") {
          resolve({ status: 200, message: "Student logged in" });
        } else if (email === "teacher@example.com" && role === "teacher") {
          resolve({ status: 200, message: "Teacher logged in" });
        } else {
          resolve({ status: 401, message: "Invalid credentials or role" });
        }
      }, 1000); // Mô phỏng độ trễ của API
    });
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
        Hi, Welcome Back
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
        Enter your credentials to continue
      </Typography>

      <Button
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2, textTransform: "none" }}
        startIcon={<img src="/assets/images/google-icon.png" alt="Google" width="20" />}
      >
        Sign in with Google
      </Button>

      <Divider sx={{ margin: "20px 0" }}>OR</Divider>

      <form onSubmit={handleSubmit}>
        <Typography variant="body1" gutterBottom>
          Sign in with Email address
        </Typography>
        <TextField
          label="Email Address / Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box sx={{ position: "relative" }}>
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            onClick={togglePasswordVisibility}
            sx={{ position: "absolute", right: 10, top: "25%" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
          Choose your role:
        </Typography>
        <RadioGroup
          value={role}
          onChange={handleRoleChange}
          row
          sx={{ justifyContent: "center", marginBottom: 2 }}
        >
          <FormControlLabel value="student" control={<Radio />} label="Tôi là học sinh" />
          <FormControlLabel value="teacher" control={<Radio />} label="Tôi là giáo viên" />
        </RadioGroup>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
          <Button variant="text" color="primary">
            Forgot Password?
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ textTransform: "none", marginBottom: 2 }}
        >
          Sign In
        </Button>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
      <Typography variant="body2" align="center">
        Don’t have an account?{" "}
        <Button variant="text" color="primary">
          Sign Up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
