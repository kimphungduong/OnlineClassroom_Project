import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CourseOverview from "./components/CourseOverview";
import ReviewList from "./components/ReviewList";
import PaginationControl from "./components/PaginationControl";
import { useLocation, useNavigate } from 'react-router-dom';

const CourseStat = () => {
  const { slug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);




  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!slug) throw new Error("Slug không tồn tại");
        const response = await fetch(
          `http://localhost:5000/api/review/${slug}/stat?page=${page}&limit=5`
        );
        if (!response.ok) throw new Error("Failed to fetch reviews");
  
        const data = await response.json();
        setReviews(data.reviews || []);
        setTotalStudents(data.totalReviews || 0);
        setAverageRating(data.averageRating?.toFixed(1) || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    fetchReviews();
  }, [page, slug]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Thống kê khóa học
      </Typography>
      <CourseOverview totalStudents={totalStudents} averageRating={averageRating} />
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Các đánh giá và phản hồi
      </Typography>
      <ReviewList reviews={reviews} />
      <PaginationControl
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Container>
  );
};

export default CourseStat;
