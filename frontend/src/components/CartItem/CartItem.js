import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";

const CartItem = ({ course, onCheck }) => {
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
          width: 100,
          height: 100,
          borderRadius: 2,
          marginRight: 2,
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
      {/* Giá và checkbox */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">₫ {course.price.toLocaleString()}</Typography>
        <Checkbox
          checked={course.checked}
          onChange={() => onCheck(course.id)}
        />
      </Box>
    </Box>
  );
};

export default CartItem;
