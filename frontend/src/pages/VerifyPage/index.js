import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import authApi from "~/api/authApi"; // Đường dẫn tới authApi.js
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const location = useLocation();
  const [email] = useState(location.state?.email || ""); // Lấy email từ trạng thái
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authApi.verifyCode(email, code);
      const token = response.data; // Giả sử token trả về ở `response.data.token`
  
      // Chuyển hướng sang trang đặt lại mật khẩu với email và token
      navigate("/reset-password", { state: { token } });
    } catch (error) {
      setMessage("Xác thực thất bại. Vui lòng thử lại.");
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
        Xác thực mã
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Mã xác thực"
          variant="outlined"
          fullWidth
          margin="normal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Xác thực
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

export default VerifyPage;
