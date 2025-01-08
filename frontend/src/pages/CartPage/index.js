import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CartItem from "../../components/CartItem";
import SummarySection from "../../components/SummarySection";
import cartApi from "../../api/cartApi";
import paymentApi from "../../api/paymentApi"; // Import API payment
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.getCart();
        setCourses(response.data.courseIds || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleCheck = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === id ? { ...course, checked: !course.checked } : course
      )
    );
  };

  const handleRemove = (id) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
  };

  const handlePayment = async () => {
    try {
      const selectedCourses = courses.filter((course) => course.checked);
      if (selectedCourses.length === 0) {
        alert("Vui lòng chọn ít nhất một khóa học để thanh toán.");
        return;
      }

      const itemIds = selectedCourses.map((course) => course._id);
      const response = await paymentApi.create(itemIds); // Gọi API tạo thanh toán
      const paymentId = response.data._id; // Lấy mã thanh toán từ API
      const qrCode = response.data.qrCode;

      // Điều hướng đến trang thanh toán và gửi danh sách khóa học
      navigate(`/payment/${paymentId}`, { state: { qrCode, selectedCourses } });
    } catch (error) {
      console.error("Error during payment creation:", error);
      alert("Có lỗi xảy ra khi tạo giao dịch thanh toán.");
    }
  };

  const total = courses
    .filter((course) => course.checked)
    .reduce((sum, course) => sum + course.price, 0);

  if (loading) {
    return <Typography>Đang tải dữ liệu...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px", // Padding xung quanh nhỏ gọn
        margin: "0 auto", // Căn giữa container
        maxWidth: "90%", // Chiếm 90% màn hình trình duyệt
        width: "100%", // Đảm bảo khung co giãn đầy đủ
        boxSizing: "border-box", // Đảm bảo padding không ảnh hưởng đến kích thước
      }}
    >
      <Box sx={{ flex: 2, marginRight: 2 }}>
        <Typography variant="h4" gutterBottom>
          Giỏ hàng
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {courses.length} khóa học trong giỏ hàng
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {courses.length === 0 ? (
          <Typography>Giỏ hàng của bạn trống</Typography>
        ) : (
          courses.map((course) => (
            <CartItem
              key={course._id}
              course={course}
              onCheck={handleCheck}
              onRemove={handleRemove}
            />
          ))
        )}
      </Box>
      <SummarySection total={total} onPayment={handlePayment} />
    </Box>
  );
};

export default CartPage;
