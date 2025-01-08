import React from "react";
import { Box, Typography } from "@mui/material";

const CartItemReadOnly = ({ course }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Hình ảnh */}
      <Box
        component="img"
        src={course.image}
        alt={course.title}
        sx={{
          width: 150,
          height: 150,
          borderRadius: 2,
          marginRight: 2,
          objectFit: 'contain', // Đảm bảo hình ảnh hiển thị đúng kích thước
        }}
    />
      {/* Thông tin khóa học */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{course.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {course.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tổng số {course.duration} giờ - {course.lectures} bài giảng
        </Typography>
        <Typography variant="body2" color="warning.main">
          {course.rating} ★ ({course.reviews} đánh giá)
        </Typography>
      </Box>
      {/* Giá */}
      <Box sx={{ textAlign: "center", marginLeft: 2 }}>
        <Typography variant="h6">₫ {course.price.toLocaleString()}</Typography>
      </Box>
    </Box>
  );
};

export default CartItemReadOnly;
