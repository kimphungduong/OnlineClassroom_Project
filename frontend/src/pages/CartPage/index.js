import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CartItem from "../../components/CartItem";
import SummarySection from "../../components/SummarySection";
import cartApi from "../../api/cartApi";

const CartPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.getCart();
        console.log("API response:", response.data);
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

  const total = courses
    .filter((course) => course.checked)
    .reduce((sum, course) => sum + course.price, 0);

  if (loading) {
    return <Typography>Đang tải dữ liệu...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
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
      <SummarySection total={total} />
    </Box>
  );
};

export default CartPage;
