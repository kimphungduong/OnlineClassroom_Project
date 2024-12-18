import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

const Detail = () => {
  const course = {
    title: 'Khóa học Ôn luyện Toán 12',
    teacher: 'Thầy Nguyễn Thành Nam',
    price: '1,399,000 VND',
    description: `Giúp các bạn học sinh nắm vững các công thức Đại số và Hình học, nâng cao kỹ năng giải bài tập và phần tích văn để.`,
    benefits: [
      'Nắm vững kiến thức cơ bản của môn Toán 12.',
      'Luyện tập vận dụng kiến thức đã học vào nhiều dạng bài.',
      'Kích thích khả năng tự duy logic và phân tích.',
      'Thử sức với ngân hàng đề thi đa dạng để đánh giá năng lực.',
      'Trải nghiệm phòng thi đấu trực tuyến giúp rèn luyện các kỹ năng.'
    ]
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {course.teacher}
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          {course.price}
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Thêm vào giỏ
        </Button>
        <Button variant="outlined" color="primary">
          Mua khóa học
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bạn sẽ học được gì?</Typography>
              <ul>
                {course.benefits.map((benefit, index) => (
                  <li key={index}><Typography>{benefit}</Typography></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Detail;
