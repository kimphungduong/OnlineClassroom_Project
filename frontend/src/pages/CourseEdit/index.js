import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CourseBreadcrumbs from './components/CourseBreadcrumbs';
import CourseSection from './components/CourseSection';
import AddSectionForm from './components/AddSectionForm';
import courseApi from '../../api/courseApi';

const CourseEdit = () => {
  const { slug } = useParams();
  const [sections, setSections] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseWithLessons = async () => {
      try {
        if (!slug) throw new Error('Slug không tồn tại');
        const response = await courseApi.getLessonsByCourseSlug(slug);
        if (!response) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.data;
        setSections(data || []);
        setCourseName(data[0]?.lessons[0]?.name || '');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course lessons:', error);
        setIsLoading(false);
      }
    };

    fetchCourseWithLessons();
  }, [slug]);

  const handleViewStats = () => {
    navigate(`/course-stat/${slug}`);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedSectionId(null);
  };

  const handleAddLesson = () => {
    navigate(`/lesson-edit/${slug}/sections/${selectedSectionId}/lesson/new`,{
      state: {
        sectionId: selectedSectionId,
        courseSlug: slug,
      },
    });
    handleMenuClose();
  };

  const handleAddTest = () => {
    navigate(`/test-edit/${slug}/sections/${selectedSectionId}/test/new`,{
      state: {
        sectionId: selectedSectionId,
        courseSlug: slug,
      },
    });
    handleMenuClose();
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
      <CourseBreadcrumbs courseName={courseName} />

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {courseName ? `Chỉnh sửa nội dung khoá học: ${courseName}` : 'Chỉnh sửa bài giảng'}
      </Typography>


      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sections.map((section) => (
          <CourseSection
            key={section._id}
            section={section}
            slug={slug}
            setSections={setSections}
            setMenuAnchor={setMenuAnchor}
            setSelectedSectionId={setSelectedSectionId}
          />
        ))}

        {/* Form thêm phần mới */}
        <AddSectionForm slug={slug} setSections={setSections} />
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleAddLesson}>Thêm bài giảng</MenuItem>
        <MenuItem onClick={handleAddTest}>Thêm bài kiểm tra</MenuItem>
      </Menu>

      <Divider sx={{ my: 2 }} />
    </Container>
  );
};

export default CourseEdit;
