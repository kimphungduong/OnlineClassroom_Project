import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { register } from "~/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // Vai trò mặc định là học sinh
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Hiển thị/Ẩn mật khẩu xác nhận
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    email: "",
    phone: "",
    agree: false,
  });
  const [errors, setErrors] = useState({}); // Lưu lỗi của từng trường
  const [loading, setLoading] = useState(false); // Hiển thị trạng thái loading

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Xóa lỗi khi người dùng sửa input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Hiển thị/Ẩn mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Kiểm tra tính hợp lệ
  const validate = () => {
    const newErrors = {};

    // Kiểm tra tên đăng nhập
    if (!form.username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống.";
    } else if (form.username.length < 5) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 5 ký tự.";
    }

    // Kiểm tra mật khẩu
    if (!form.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    // Kiểm tra nhập lại mật khẩu
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    }

    // Kiểm tra tên hiển thị
    if (!form.displayName.trim()) {
      newErrors.displayName = "Tên người dùng không được để trống.";
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email không đúng định dạng.";
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^\d{10}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số.";
    }

    // Kiểm tra điều khoản
    if (!form.agree) {
      newErrors.agree = "Bạn cần đồng ý với các điều khoản để đăng ký.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi nhấn nút "Đăng ký"
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validate()) {
      setErrors(""); // Reset thông báo lỗi
      setLoading(true); // Bật trạng thái loading
  
      try {
        // Kết hợp role vào dữ liệu gửi đi
        const formData = { ...form, role };
  
        // Gửi thông tin đăng ký qua Redux Thunk
        await dispatch(register(formData)).unwrap();
        console.log("Register successful");
        navigate("/"); // Chuyển hướng đến trang chủ
      } catch (err) {
        setErrors(err.message || "Đăng ký thất bại");
        console.error("Register failed:", err.message);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
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
        maxHeight: "90vh", // Giới hạn chiều cao
        overflow: "auto", // Cuộn nếu vượt quá màn hình
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Đăng ký tài khoản
      </Typography>

      {/* Lựa chọn vai trò */}
      <RadioGroup
        row
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ justifyContent: "center", marginBottom: 2 }}
      >
        <FormControlLabel
          value="student"
          control={<Radio />}
          label={
            <span>
              <SchoolIcon fontSize="small" sx={{ marginRight: 1 }} />
              Học sinh
            </span>
          }
        />
        <FormControlLabel
          value="teacher"
          control={<Radio />}
          label={
            <span>
              <PersonOutlineIcon fontSize="small" sx={{ marginRight: 1 }} />
              Giáo viên
            </span>
          }
        />
      </RadioGroup>

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
          error={!!errors.username}
          helperText={errors.username}
        />

        {/* Mật khẩu */}
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
            error={!!errors.password}
            helperText={errors.password}
          />
          <IconButton
            onClick={togglePasswordVisibility}
            sx={{ position: "absolute", right: 10, top: "30%" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        {/* Nhập lại mật khẩu */}
        <Box sx={{ position: "relative" }}>
          <TextField
            label="Nhập lại mật khẩu"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <IconButton
            onClick={toggleConfirmPasswordVisibility}
            sx={{ position: "absolute", right: 10, top: "30%" }}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        {/* Tên người dùng */}
        <TextField
          label="Tên người dùng"
          variant="outlined"
          fullWidth
          margin="normal"
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          error={!!errors.displayName}
          helperText={errors.displayName}
        />

        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        {/* Số điện thoại */}
        <TextField
          label="Số điện thoại"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        {/* Checkbox đồng ý điều khoản */}
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            Tôi đồng ý với các điều khoản
          </label>
        </div>

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
    </Box>
  );
};

export default RegisterPage;
