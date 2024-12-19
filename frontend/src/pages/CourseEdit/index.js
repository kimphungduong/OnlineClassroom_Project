import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Collapse, IconButton, Button, Divider, Breadcrumbs, Link, TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';

const CourseEdit = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [lessons, setLessons] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [newLessonName, setNewLessonName] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/course/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Course:', data);
        setLessons(data.lessons || []);
        setCourseName(data.name || ''); // Lấy tên khóa học
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  const handleExpandClick = (id) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson._id !== id));
  };

  const handleEditLesson = (lessonId) => {
    const lesson = lessons.find((l) => l._id === lessonId);
    if (lesson) {
      navigate('/lesson-edit', { state: { lessonData: lesson } });
    }
  };

  const handleAddLesson = () => {
    if (newLessonName.trim() === '') return;
    const newLesson = {
      _id: Date.now().toString(),
      name: newLessonName,
      description: '',
    };
    setLessons([...lessons, newLesson]);
    setNewLessonName('');
  };

  const handleSaveLessons = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/course/${slug}/lessons`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessons }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Lưu bài giảng thành công!');
    } catch (error) {
      console.error('Error saving lessons:', error);
      alert('Lỗi khi lưu bài giảng');
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Typography>Đang tải khóa học...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="false" sx={{ mt: 4, mb: 4, backgroundColor: '#fff', p: 3, borderRadius: 2 }}>
      <Breadcrumbs sx={{ mb: 3 }} separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">Trang chủ</Link>
        <Link underline="hover" color="inherit" href="/courses">Danh sách khóa học</Link>
        <Typography color="text.primary">Chỉnh sửa bài giảng</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {courseName ? `Chỉnh sửa bài giảng: ${courseName}` : 'Chỉnh sửa bài giảng'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lessons.map((lesson) => (
          <Box
            key={lesson._id}
            sx={{
              p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#fff', boxShadow: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                value={lesson.name}
                fullWidth
                disabled
                sx={{ mr: 2 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton color="primary" onClick={() => handleExpandClick(lesson._id)}>
                  {expandedLesson === lesson._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton color="secondary" onClick={() => handleEditLesson(lesson._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteLesson(lesson._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            <Collapse in={expandedLesson === lesson._id} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 2, pl: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mô tả: {lesson.description || 'Chưa có mô tả'}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center', mb: 3 }}>
        <TextField
          label="Tên bài giảng mới"
          variant="outlined"
          value={newLessonName}
          onChange={(e) => setNewLessonName(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddLesson}
        >
          Thêm bài giảng mới
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSaveLessons}
          sx={{ px: 5, py: 1.5, fontWeight: 'bold' }}
        >
          Lưu lại thay đổi
        </Button>
      </Box>
    </Container>
  );
};

export default CourseEdit;
