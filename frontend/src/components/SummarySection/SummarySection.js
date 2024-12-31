import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";

const SummarySection = ({ total, onApplyDiscount }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onApplyDiscount(e.target.value);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        border: "1px solid #ddd",
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h6">Tổng:</Typography>
      <Typography variant="h4" gutterBottom>
        ₫ {total.toLocaleString()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "100%", marginBottom: 2 }}
      >
        Thanh toán
      </Button>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="body1" gutterBottom>
        Khuyến mãi
      </Typography>
      <TextField
        placeholder="Nhập code"
        fullWidth
        size="small"
        onKeyDown={handleKeyDown}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="outlined" color="success">
        Nhập
      </Button>
    </Box>
  );
};

export default SummarySection;
