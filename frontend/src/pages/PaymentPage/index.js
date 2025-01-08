// PaymentPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Button } from "@mui/material";
import CartItemReadOnly from "../../components/CartItemReadOnly";
import paymentApi from "../../api/paymentApi";
import { Title } from "@mui/icons-material";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams(); // Lấy mã thanh toán từ URL

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Trạng thái hiển thị thông báo thành công

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await paymentApi.getPayment(paymentId); // Gọi API để lấy thông tin thanh toán
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        alert("Không thể tải thông tin thanh toán.");
      }
    };

    fetchPaymentDetails();

    paymentApi
      .process(paymentId) // Gọi API để kiểm tra giao dịch
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(response.data.message); // Cập nhật thông báo thành công
          notification.success({
            message: 'Thành công',
            description: 'Thanh toán thành công!',
          });
        }
        navigate('/my-course');
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
      });
  }, [paymentId]);

  const handleCancel = async () => {
    try {
      await paymentApi.cancel(paymentId); // Gọi API hủy thanh toán
      alert("Thanh toán đã bị hủy.");
      window.location.href = "/cart"; // Quay lại trang giỏ hàng
    } catch (error) {
      console.error("Error canceling payment:", error);
      alert("Không thể hủy thanh toán.");
    }
  };

  if (!paymentDetails) {
    return <Typography>Đang tải thông tin thanh toán...</Typography>;
  }

  const { course, amount, method, status, description } = paymentDetails;

  return (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      justifyContent: "space-between",
      padding: 2,
      backgroundColor: "#f9f9f9",
      borderRadius: 2,
      boxShadow: 3,
      marginX: { xs: 2, md: 6 }, // Tăng khoảng cách hai bên khi màn hình lớn
      width: "90%", // Giới hạn độ rộng tổng thể
      margin: "auto", // Canh giữa trang
    }}
  >
    {/* Danh sách khóa học */}
    <Box sx={{ flex: 2, marginRight: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Thanh toán
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{ marginBottom: 1 }}
      >
        {course.length} khóa học
      </Typography>
      <Divider sx={{ marginBottom: 2, borderColor: "#ddd" }} />
      {course.map((courseItem) => (
        <CartItemReadOnly
          key={courseItem._id}
          course={{
            title: courseItem.name,
            ...courseItem,
            author: courseItem.teacher?.name,
          }}
        />
      ))}
    </Box>

    {/* QR Code Section */}
    <Box
      sx={{
        flex: 1,
        textAlign: "center",
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Quét mã QR để thanh toán
      </Typography>
      <img
        src={paymentDetails.qrCode || "https://via.placeholder.com/150"}
        alt="QR Code"
        style={{
          width: "98%", // Giảm kích thước QR xuống còn 80% container
          maxWidth: "300px", // Đặt chiều rộng tối đa
          height: "auto", // Giữ tỉ lệ nguyên gốc
          borderRadius: "8px", // Thêm góc bo tròn
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Tăng tính thẩm mỹ
          margin: "0 auto", // Căn giữa
          display: "block", // Đảm bảo QR được căn giữa
        }}
      />

      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{ marginTop: 2 }}
      >
        Tổng tiền:{" "}
        <Typography component="span" sx={{ fontWeight: "bold", color: "#333" }}>
          {amount.toLocaleString()} VND
        </Typography>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Phương thức:{" "}
        <Typography component="span" sx={{ fontWeight: "bold", color: "#333" }}>
          {method}
        </Typography>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Trạng thái:{" "}
        <Typography component="span" sx={{ fontWeight: "bold", color: "#333" }}>
          {status}
        </Typography>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Mô tả:{" "}
        <Typography component="span" sx={{ fontWeight: "bold", color: "#333" }}>
          {description}
        </Typography>
      </Typography>
      {status === "pending" && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancel}
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            ":hover": { backgroundColor: "#ffebee" },
          }}
        >
          Hủy thanh toán
        </Button>
      )}
    </Box>

    {/* Thông báo thanh toán thành công */}
    {successMessage && (
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          padding: 2,
          backgroundColor: "green",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: 3,
          zIndex: 10,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {successMessage}
        </Typography>
      </Box>
    )}
  </Box>

  );
  
};

export default PaymentPage;
