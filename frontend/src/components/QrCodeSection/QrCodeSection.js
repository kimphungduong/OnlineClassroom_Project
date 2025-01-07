import React from "react";
import { Box, Typography, Button } from "@mui/material"; // Đã thêm Button

const QrCodeSection = ({ total, onCancel }) => {
  return (
    <Box
      sx={{
        flex: 1,
        textAlign: "center",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Quét mã QR để thanh toán
      </Typography>
      <Box
        component="img"
        src="https://via.placeholder.com/200"
        alt="QR Code"
        sx={{
          width: 200,
          height: 200,
          margin: "0 auto",
        }}
      />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Tổng tiền: ₫ {total.toLocaleString()}
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={{ marginTop: 2 }}
        onClick={onCancel} // Gọi hàm onCancel
      >
        Hủy thanh toán
      </Button>
    </Box>
  );
};

export default QrCodeSection;
