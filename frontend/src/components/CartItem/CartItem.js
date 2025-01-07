import React from "react";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ course, onCheck, onRemove }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: 2, borderBottom: "1px solid #ddd" }}>
      {/* Hình ảnh */}
      <Box component="img" src={course.image} alt={course.name} sx={{ width: 100, height: 100, borderRadius: 2, marginRight: 2 }} />
      {/* Thông tin khóa học */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{course.name}</Typography> 
        <Typography variant="body2" color="textSecondary">{course.description}</Typography>
        <Typography variant="body2" color="warning.main">{course.rating} ★</Typography>
        {/* Lấy tên giáo viên */}
        <Typography variant="body2" color="textSecondary">{course.teacher?.name || "Không rõ"}</Typography>
      </Box>
      {/* Giá và checkbox */}
      <Box sx={{ textAlign: "center", marginRight: 2 }}>
        <Typography variant="h6">₫ {course.price.toLocaleString()}</Typography>
        <Checkbox checked={course.checked} onChange={() => onCheck(course._id)} />
      </Box>
      {/* Nút xóa */}
      <Box>
        <IconButton color="error" onClick={() => onRemove(course._id)} aria-label="Xóa khóa học">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;


