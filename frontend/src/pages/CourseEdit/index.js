import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, List, ListItem, ListItemText, Collapse, IconButton, Button, Divider, Breadcrumbs, Link, TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const CourseEdit = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [lessons, setLessons] = useState([]); // Load bài giảng thay vì khóa học
  const navigate = useNavigate();
  const [newLessonName, setNewLessonName] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lessons'); // Endpoint mới cho lessons
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // Chuyển đổi dữ liệu từ JSON
        const data = await response.json();
        console.log('Fetched Lessons:', data);
  
        // Cập nhật state với dữ liệu lấy về
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
  
    fetchLessons();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson._id !== id));  // Xóa bài giảng
  };

  const handleEditLesson = (lessonId) => {
    const lesson = lessons.find((l) => l._id === lessonId);
    navigate('/lesson-edit', { state: { lessonData: lesson } });
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

  return (
    <Container maxWidth="false" sx={{ mt: 4, mb: 4, backgroundColor: '#fff', p: 3, borderRadius: 2 }}>
      <Breadcrumbs sx={{ mb: 3 }} separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">Trang chủ</Link>
        <Link underline="hover" color="inherit" href="/lessons">Danh sách bài giảng</Link>
        <Typography color="text.primary">Chỉnh sửa bài giảng</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Chỉnh sửa bài giảng
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lessons.map((lesson) => (
          <Box
            key={lesson._id}  // Sử dụng _id làm key
            sx={{
              p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#fff', boxShadow: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                value={lesson.name}
                fullWidth
                sx={{ mr: 2 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton color="primary" onClick={() => handleExpandClick(lesson._id)}>  {/* Expand lesson */}
                  {expandedLesson === lesson._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton color="secondary" onClick={() => handleEditLesson(lesson._id)}>  {/* Nút chỉnh sửa */}
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteLesson(lesson._id)}>  {/* Xóa bài giảng */}
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
          sx={{ px: 5, py: 1.5, fontWeight: 'bold' }}
        >
          Lưu lại thay đổi
        </Button>
      </Box>
    </Container>
  );
};

export default CourseEdit;
