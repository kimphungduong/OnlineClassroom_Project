import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Divider,
  Pagination,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const CourseStat = () => {
    const [reviews, setReviews] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
  
    // Fetch API
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/review");
        if (!response.ok) throw new Error("Failed to fetch reviews");
  
        const data = await response.json();
  
        // Tính tổng học viên và đánh giá trung bình
        const total = data.length;
        const avgRating =
          data.reduce((sum, review) => sum + review.rating, 0) / total;
  
        setReviews(data);
        setTotalStudents(total);
        setAverageRating(avgRating.toFixed(1));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    // UseEffect để gọi API khi component được mount
    useEffect(() => {
      fetchReviews();
    }, []);


    // Dữ liệu tĩnh
    // const staticData = [
    //     {
    //       student: { name: "Quang Cao" },
    //       rating: 4.5,
    //       comment: "Khóa học rất bổ ích, kiến thức đầy đủ. Giáo viên giải đáp thắc mắc tận tâm.",
    //       createdAt: "2024-04-21T11:11:00Z",
    //     },
    //     {
    //       student: { name: "Nguyen Van A" },
    //       rating: 5,
    //       comment: "Khóa học tuyệt vời, bài giảng dễ hiểu và thực tế.",
    //       createdAt: "2024-04-22T08:30:00Z",
    //     },
    //     {
    //       student: { name: "Tran Van B" },
    //       rating: 4,
    //       comment: "Giáo viên rất nhiệt tình và tài liệu phong phú.",
    //       createdAt: "2024-04-23T09:00:00Z",
    //     },
    //   ];
    
    //   useEffect(() => {
    //     // Giả lập fetch dữ liệu bằng cách gán từ staticData
    //     setReviews(staticData);
    
    //     // Tính tổng học viên và đánh giá trung bình
    //     const total = staticData.length;
    //     const avgRating =
    //       staticData.reduce((sum, review) => sum + review.rating, 0) / total;
    
    //     setTotalStudents(total);
    //     setAverageRating(avgRating.toFixed(1));
    //   }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} color="warning" />
        ))}
        {halfStar && <StarHalfIcon color="warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} color="warning" />
        ))}
      </>
    );
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Tổng quan */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Thống kê khóa học
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} sm={3} textAlign="center">
            <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
              {totalStudents}
            </Typography>
            <Typography variant="h6">Học viên</Typography>
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
            <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
              {averageRating}
            </Typography>
            <Typography variant="h6">Đánh giá</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Danh sách đánh giá */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Các đánh giá và phản hồi
      </Typography>
      {reviews.map((review, index) => (
        <Paper
          key={index}
          elevation={1}
          sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar alt="Student Avatar" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.student?.name || "Học viên ẩn danh"}
              </Typography>
              <Box display="flex" alignItems="center">
                {renderStars(review.rating)}
              </Box>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {review.comment}
          </Typography>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            {new Date(review.createdAt).toLocaleString()}
          </Typography>
        </Paper>
      ))}

      {/* Phân trang */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={5} color="primary" />
      </Box>
    </Container>
  );
};

export default CourseStat;
