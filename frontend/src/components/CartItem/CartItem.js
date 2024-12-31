import React from "react";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ course, onCheck, onRemove }) => {
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
      <Box sx={{ textAlign: "center", marginRight: 2 }}>
        <Typography variant="h6">₫ {course.price.toLocaleString()}</Typography>
        <Checkbox
          checked={course.checked}
          onChange={() => onCheck(course.id)}
        />
      </Box>
      {/* Icon thùng rác */}
      <Box>
        <IconButton
          color="error"
          onClick={() => onRemove(course.id)}
          aria-label="Xóa khóa học"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
