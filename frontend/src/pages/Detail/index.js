import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getCourse } from '~/services/courseService';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Container,
  Box,
  Typography,
  Button,
  CardMedia,
  Rating,
} from '@mui/material';

const CourseDetailPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [course, setCourse] = useState(null);

  // Fetch thông tin khóa học khi component được mount
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const courseData = await getCourse(slug); // Truyền slug động
        setCourse(courseData); // Cập nhật dữ liệu khóa học vào state
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourseDetail();
  }, [slug]);

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!course) {
    return <Typography variant="h6" align="center">Đang tải thông tin khóa học...</Typography>;
  }

  // Cập nhật dữ liệu khi course có đầy đủ các trường
  const benefits = course.benefits || []; // Nếu benefits không có, gán là mảng rỗng

  return (
    <Container maxWidth={false} disableGutters sx={{ padding: '0', position: 'relative' }}>
      {/* Phần 1: Toàn màn hình */}
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '40px 20px',
          position: 'relative',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ ml: 30, mt: 3, maxWidth: '500px', fontWeight: 'bold' }}>
          {course.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 30, maxWidth: '500px', mt: 2 }}>
          {course.teacher?.name || 'Chưa có thông tin giáo viên'}
        </Typography>
        <Typography variant="body1" paragraph sx={{ ml: 30, maxWidth: '600px', mt: 2 }}>
          {course.description}
        </Typography>
        <Box display="flex" alignItems="center" gap={2} sx={{ ml: 30, maxWidth: '600px', mt: 2 }}>
          <Typography variant="body1">
            {course.rating}
          </Typography>
          <Rating
            value={course.rating}
            precision={0.5}
            readOnly
            emptyIcon={<StarBorderIcon style={{ color: '#fff' }} fontSize="inherit" />}
          />
          <Typography variant="body1">(87 rating)</Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ mt: 2, ml: 30 }}>
          {course.lessons.length} bài giảng
        </Typography>
      </Box>

      {/* Phần 2: Bạn sẽ học được gì - Toàn màn hình */}
      <Box
        sx={{
          padding: '40px 20px',
          position: 'relative',
          ml: 30
        }}
      >
        <Typography variant="h5" gutterBottom>
          Bạn sẽ học được gì?
        </Typography>
        {benefits.length > 0 ? (
          <ul style={{ paddingLeft: '20px' }}>
            {benefits.map((benefit, index) => (
              <li key={index}>
                <Typography variant="body1">{benefit}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">Chưa có thông tin về lợi ích khóa học.</Typography>
        )}
      </Box>

      {/* Phần 3: Box nổi - Đè lên */}
      <Box
        sx={{
          width: '300px',
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#fff',
          boxShadow: 3,
          padding: '20px',
          mt: 4,
          mr: 30,
          minHeight: '400px',
        }}
      >
        <CardMedia
          component="img"
          image={course.image}
          alt={course.name}
          sx={{ marginBottom: '20px', padding: '0px' }}
        />
        <Typography variant="h5" color="primary" mb={2}>
          {course.price.toLocaleString()} VND
        </Typography>
        <Box display="flex" gap={1} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ flex: 5 }}
          >
            Thêm vào giỏ
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FavoriteBorderIcon />
          </Button>
        </Box>
        <Button variant="contained" color="secondary" fullWidth>
          Mua khóa học
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDetailPage;
