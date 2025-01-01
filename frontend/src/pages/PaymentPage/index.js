// PaymentPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Button } from "@mui/material";
import CartItemReadOnly from "../../components/CartItemReadOnly";
import paymentApi from "../../api/paymentApi";
import { Title } from "@mui/icons-material";

const PaymentPage = () => {
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
        if (response.data.message === "Payment completed successfully") {
          setSuccessMessage(response.data.message); // Cập nhật thông báo thành công
        }
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
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      {/* Danh sách khóa học */}
      <Box sx={{ flex: 2, marginRight: 2 }}>
        <Typography variant="h4" gutterBottom>
          Thanh toán
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {course.length} khóa học
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {course.map((courseItem) => (
          <CartItemReadOnly key={courseItem._id} course={{title: courseItem.name ,...courseItem, author: courseItem.teacher?.name }} />
        ))}
      </Box>

      {/* QR Code Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Quét mã QR để thanh toán
        </Typography>
        <img src={paymentDetails.qrCode || "https://via.placeholder.com/150"} alt="QR Code" style={{ width: "100%" }} />
        <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ marginTop: 2 }}>
          Tổng tiền: {amount.toLocaleString()} VND
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Phương thức: {method}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Trạng thái: {status}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Mô tả: {description}
        </Typography>
        <Button variant="outlined" color="error" onClick={handleCancel} sx={{ marginTop: 2 }}>
          Hủy thanh toán
        </Button>
      </Box>

      {/* Thông báo thanh toán thành công */}
      {successMessage && (
        <Box sx={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)" }}>
          <Typography variant="h6" color="green">
            {successMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
