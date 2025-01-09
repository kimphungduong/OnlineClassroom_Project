import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CartItem from "../../components/CartItem";
import SummarySection from "../../components/SummarySection";
import CourseCardHome from "./CourseCardHome"; // Component để hiển thị khóa học đề xuất
import Slider from "react-slick"; // Thư viện slider
import cartApi from "../../api/cartApi";
import courseApi from "~/api/courseApi"; // Import API recommendation
import paymentApi from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Row } from "antd";
import { Container } from "@mui/material";


const CartPage = () => {
  const [courses, setCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]); // State cho đề xuất
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

    const fetchRecommendations = async () => {
      try {
        // Gọi API lấy danh sách đề xuất
        const response = await courseApi.getRecommendedCourses();
        console.log(response.data.data);
        setRecommendedCourses(response.data.data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error.response?.data || error.message);
      }
    };

    fetchCart();
    fetchRecommendations();
  }, []);

  const handleCheck = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === id ? { ...course, checked: !course.checked } : course
      )
    );
  };

  const handleRemove = async (id) => {
    try {
      await cartApi.removeFromCart(id);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
      notification.success({ message: "Đã xóa khóa học khỏi giỏ hàng" });
    } catch (error) {
      console.error("Error removing course from cart:", error.response?.data || error.message);
      notification.error({ message: "Có lỗi xảy ra khi xóa khóa học khỏi giỏ hàng" });
    }
  };

  const handlePayment = async () => {
    try {
      const selectedCourses = courses.filter((course) => course.checked);
      if (selectedCourses.length === 0) {
        alert("Vui lòng chọn ít nhất một khóa học để thanh toán.");
        return;
      }

      const itemIds = selectedCourses.map((course) => course._id);
      const response = await paymentApi.create(itemIds);
      const paymentId = response.data._id;
      const qrCode = response.data.qrCode;

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

  // Cấu hình Slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // Số lượng slide hiển thị trên mỗi màn hình
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,  // Khi màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 2,  // Hiển thị 2 slide
        },
      },
      {
        breakpoint: 600,  // Khi màn hình nhỏ hơn 600px
        settings: {
          slidesToShow: 1,  // Hiển thị 1 slide
        },
      },
    ],
  };
  

  return (
    <>
    <Container min-width="100%" sx={{ mt: 4, position: "relative", flex: 1 }}>
      
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        margin: "0 auto",
        maxWidth: "90%",
        width: "100%",
        boxSizing: "border-box",
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
      {recommendedCourses.length > 0 && (
      <Box sx={{ mt: 4, position: "relative", flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Đề xuất cho bạn
        </Typography>
        {/* <Slider {...sliderSettings}> */}
          {recommendedCourses.map((course) => (
            <Box px={2}>
              <CourseCardHome course={course} />
              {/* <Typography>abc</Typography> */}
            </Box>
          ))}
        {/* </Slider> */}
      </Box>)}     
    </Container>
    

  </>
  );
};

export default CartPage;
