import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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

const ReviewList = ({ reviews }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <Paper
          key={index}
          elevation={1}
          sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#f9f9f9" }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar alt="Student Avatar" src={review.student?.avatar || ""} />
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
    </>
  );
};

export default ReviewList;