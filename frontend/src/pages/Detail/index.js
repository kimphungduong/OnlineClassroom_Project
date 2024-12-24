import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CardMedia,
  Rating,
  Divider,
} from '@mui/material';

const CourseDetailPage = () => {
  const course = {
    title: 'Khóa học Ôn luyện Toán 12',
    teacher: 'Nguyễn Thành Nam',
    description:
      'Giúp các bạn học sinh nắm vững các công thức Đại số và Hình học, nâng cao kỹ năng giải bài tập và phân tích vấn đề.',
    rating: 4.5,
    totalLectures: 28,
    price: '1,399,000 VND',
    image: 'https://via.placeholder.com/350x200',
    benefits: [
      'Nắm vững kiến thức cơ bản của môn Toán 12.',
      'Luyện tập vận dụng kiến thức đã học vào nhiều dạng bài.',
      'Kích thích khả năng tư duy logic và phân tích.',
      'Thử sức với ngân hàng đề thi đa dạng để đánh giá năng lực.',
      'Trải nghiệm phòng thi đấu trực tuyến giúp rèn luyện các kỹ năng.',
      'Cải thiện hiệu quả kỹ năng giải bài tập.',
    ],
  };

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
        <Typography variant="h4" gutterBottom sx={{ml: 30, mt: 3, maxWidth: '500px', fontWeight: 'bold'}}>
          {course.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ml: 30, maxWidth: '500px', mt: 2}}>
          {course.teacher}
        </Typography>
        <Typography variant="body1" paragraph sx={{ml: 30, maxWidth: '600px', mt: 2}}>
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
          <Typography variant="body1">
            (87 rating) 
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ mt: 2, ml: 30 }}>
          {course.totalLectures} bài giảng
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
        <ul style={{ paddingLeft: '20px' }}>
          {course.benefits.map((benefit, index) => (
            <li key={index}>
              <Typography variant="body1">{benefit}</Typography>
            </li>
          ))}
        </ul>
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
          alt={course.title}
          sx={{ marginBottom: '20px', padding: '0px' }}
        />
        <Typography variant="h5" color="primary" mb={2}>
          {course.price}
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