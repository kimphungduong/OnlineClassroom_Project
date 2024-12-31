import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CartItemReadOnly from "../../components/CartItemReadOnly";
import QrCodeSection from "../../components/QrCodeSection";

const PaymentPage = () => {
  const [courses] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      title: "Bổ trợ kiến thức toán 12 - Thi THPT Quốc gia",
      author: "Đặng Thành Nam",
      duration: 12,
      lectures: 100,
      rating: 2,
      reviews: 50,
      price: 1000000,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      title: "Bổ trợ kiến thức toán 12 - Thi THPT Quốc gia",
      author: "Đặng Thành Nam",
      duration: 12,
      lectures: 100,
      rating: 2,
      reviews: 50,
      price: 1000000,
    },
  ]);

  // Tính tổng tiền
  const total = courses.reduce((sum, course) => sum + course.price, 0);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      {/* Danh sách khóa học */}
      <Box sx={{ flex: 2, marginRight: 2 }}>
        <Typography variant="h4" gutterBottom>
          Thanh toán
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {courses.length} khóa học
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {courses.map((course) => (
          <CartItemReadOnly key={course.id} course={course} />
        ))}
      </Box>

      {/* QR Code Section */}
      <QrCodeSection total={total} />
    </Box>
  );
};

export default PaymentPage;
