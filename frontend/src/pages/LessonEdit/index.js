import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Container,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadComponent from '../../components/UploadFile/UploadComponent';

const EditLesson = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionId, courseSlug, lessonId } = location.state || {};
  const [courseId, setCourseId] = useState('');
  const [lessonData, setLessonData] = useState({
    name: '',
    videoUrl: '',
    description: '',
    course: '', // Will be set dynamically after fetching
  });
  const [lessonFiles, setLessonFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!lessonId; // Determine if this is an edit or a new lesson

  useEffect(() => {
    const fetchCourseAndLesson = async () => {
      try {
        // Fetch courseId using courseSlug
        const courseResponse = await fetch(`http://localhost:5000/api/course/${courseSlug}`);
        if (!courseResponse.ok) throw new Error('Không thể tải thông tin khóa học');
        const courseData = await courseResponse.json();
        setCourseId(courseData._id); // Store courseId

        // If editing, fetch lesson details
        if (isEditing) {
          const lessonResponse = await fetch(`http://localhost:5000/api/lesson/${lessonId}`);
          if (!lessonResponse.ok) throw new Error('Không thể tải dữ liệu bài giảng');

          const lessonData = await lessonResponse.json();
          setLessonData({
            name: lessonData.name,
            videoUrl: lessonData.videoUrl,
            description: lessonData.description,
            course: courseData._id, // Assign courseId to the lesson data
          });
        } else {
          // For a new lesson, initialize with courseId
          setLessonData((prev) => ({
            ...prev,
            course: courseData._id,
          }));
        }
      } catch (error) {
        console.error('Error fetching course or lesson:', error);
        alert('Không thể tải dữ liệu.');
      }
    };

    fetchCourseAndLesson();
  }, [courseSlug, sectionId, lessonId, isEditing]);

  const handleChange = (field, value) => {
    setLessonData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUploadSubmit = (newFile) => {
    setLessonFiles([...lessonFiles, newFile]);
  };

  const handleDeleteFile = (index) => {
    setLessonFiles(lessonFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!lessonData.name || !lessonData.videoUrl) {
      alert('Vui lòng điền đầy đủ thông tin bài giảng.');
      return;
    }

    setIsSubmitting(true);

    const lessonPayload = {
      ...lessonData,
      description: lessonData.description || 'Không có mô tả', // Default description
      duration: lessonData.duration || 3600, // Default duration
      course: courseId, // Include the courseId
      document: [
        {
          name: 'Dome13 2', // Add document details
          link: 'https://ep123le.com/doc2.pdf',
        },
      ],
    };
    alert(JSON.stringify(lessonPayload, null, 2));
    try {
      const endpoint = isEditing
      ? `http://localhost:5000/api/course/${courseSlug}/section/${sectionId}/lesson/${lessonId}`
      : `http://localhost:5000/api/course/${courseSlug}/section/${sectionId}/lesson/new`;

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lessonPayload),
      });

      if (!response.ok) throw new Error('Lỗi khi lưu bài giảng');

      alert(isEditing ? 'Cập nhật bài giảng thành công!' : 'Thêm bài giảng thành công!');
      navigate(-1); // Navigate back
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Đã xảy ra lỗi khi lưu bài giảng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        {isEditing ? 'Chỉnh sửa bài giảng' : 'Thêm bài giảng mới'}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Tên bài giảng"
            fullWidth
            value={lessonData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL Video"
            fullWidth
            value={lessonData.videoUrl}
            onChange={(e) => handleChange('videoUrl', e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mô tả bài giảng"
            fullWidth
            multiline
            rows={4}
            value={lessonData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            variant="outlined"
          />
        </Box>

        <UploadComponent onSubmit={handleUploadSubmit} />

        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu bài giảng'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditLesson;
