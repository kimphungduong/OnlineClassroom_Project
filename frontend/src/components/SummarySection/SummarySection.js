import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";

const SummarySection = ({ total, onPayment }) => {
  return (
    <Box
      sx={{
        display: "inline-block", // Giúp khung tự động vừa nội dung
        border: "1px solid #ddd",
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#fff",
        textAlign: "left",
        minWidth: "fit-content", // Đảm bảo khung chỉ rộng vừa nội dung
        maxWidth: "300px", // Đặt giới hạn chiều rộng tối đa nếu cần
        margin: "auto", // Căn giữa khung
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        CỘNG GIỎ HÀNG
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <Typography variant="body1">Tạm tính</Typography>
        <Typography variant="body1">₫ {total.toLocaleString()}</Typography>
      </Box>
      <Divider sx={{ marginBottom: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Tổng
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ₫ {total.toLocaleString()}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#007BFF", // Màu xanh dương
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "20px",
          fontSize: "16px",
          textAlign: "center",
          '&:hover': {
            backgroundColor: "#0056b3", // Màu xanh đậm hơn khi hover
          },
        }}
        onClick={onPayment}
      >
        Tiến hành thanh toán
      </Button>
    </Box>
  );
};

export default SummarySection;
