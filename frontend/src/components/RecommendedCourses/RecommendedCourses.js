import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import courseApi from '../../api/courseApi';

const RecommendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách khóa học gợi ý (API tự nhận diện người dùng)
      courseApi.getRecommendations()
      .then(response => {
        if (response.data.success) {
          setCourses(response.data.data); // Gán danh sách khóa học
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi tải khóa học gợi ý:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Đang tải gợi ý khóa học...</Typography>;
  }

  return (
    <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" gutterBottom>
        Khóa học đề xuất
      </Typography>
      {courses.length === 0 ? (
        <Typography>Không có khóa học nào được đề xuất.</Typography>
      ) : (
        courses.map((course) => (
          <Card key={course._id} sx={{ marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={course.image}
              alt={course.name}
            />
            <CardContent>
              <Typography variant="h6">{course.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {course.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 1, color: '#d32f2f' }}>
                Giá: {course.price} VND
              </Typography>
            </CardContent>
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              color="primary"
              href={`/courses/${course._id}`}
            >
              Xem chi tiết
            </Button>
          </Card>
        ))
      )}
    </Box>
  );
};

export default RecommendedCourses;
