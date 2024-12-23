import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CartItem from "../../components/CartItem";
import SummarySection from "../../components/SummarySection";
// console.log("CartItem:", CartItem);
// console.log("SummarySection:", SummarySection);

const CartPage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/100", // URL ảnh placeholder
      title: "Bổ trợ kiến thức toán 12 - Thi THPT Quốc gia",
      author: "Đặng Thành Nam",
      duration: 12,
      lectures: 100,
      rating: 2,
      reviews: 50,
      price: 1000000,
      checked: true,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100", // URL ảnh placeholder
      title: "Bổ trợ kiến thức toán 12 - Thi THPT Quốc gia",
      author: "Đặng Thành Nam",
      duration: 12,
      lectures: 100,
      rating: 2,
      reviews: 50,
      price: 1000000,
      checked: false,
    },
  ]);

  const handleCheck = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, checked: !course.checked } : course
      )
    );
  };

  const handleApplyDiscount = (code) => {
    console.log("Applied discount code:", code);
  };

  const total = courses
    .filter((course) => course.checked)
    .reduce((sum, course) => sum + course.price, 0);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      {/* Danh sách khóa học */}
      <Box sx={{ flex: 2, marginRight: 2 }}>
        <Typography variant="h4" gutterBottom>
          Giỏ hàng
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {courses.length} khóa học trong giỏ hàng
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {courses.map((course) => (
          <CartItem key={course.id} course={course} onCheck={handleCheck} />
        ))}
      </Box>

      {/* Tổng tiền và mã giảm giá */}
      <SummarySection total={total} onApplyDiscount={handleApplyDiscount} />
    </Box>
  );
};

export default CartPage;
