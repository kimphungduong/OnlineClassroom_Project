import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Collapse,
  IconButton,
  Button,
  Divider,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';

const CourseEdit = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [sections, setSections] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSectionId, setEditingSectionId] = useState(null); // Theo dõi trạng thái chỉnh sửa section
  const [newSectionTitle, setNewSectionTitle] = useState(''); // Dữ liệu tiêu đề mới của section
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseWithLessons = async () => {
      try {
        if (!slug) throw new Error('Slug không tồn tại');

        const response = await fetch(`http://localhost:5000/api/course/${slug}/lessons`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Course:', data);
        setSections(data || []);
        setCourseName(data[0]?.lessons[0]?.course.name || ''); // Lấy tên khóa học
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course lessons:', error);
        setIsLoading(false);
      }
    };

    fetchCourseWithLessons();
  }, [slug]);

  const handleExpandSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleEditSectionClick = (sectionId, currentTitle) => {
    setEditingSectionId(sectionId); // Đặt trạng thái đang chỉnh sửa
    setNewSectionTitle(currentTitle); // Hiển thị tiêu đề hiện tại để chỉnh sửa
  };

  const handleSaveSectionTitle = async (sectionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/course/${slug}/sections/${sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newSectionTitle }),
      });

      if (!response.ok) throw new Error('Không thể cập nhật tiêu đề');

      const updatedSections = sections.map((section) =>
        section._id === sectionId ? { ...section, title: newSectionTitle } : section
      );
      setSections(updatedSections);
      setEditingSectionId(null); // Thoát khỏi chế độ chỉnh sửa
      setNewSectionTitle('');
      alert('Cập nhật tiêu đề thành công!');
    } catch (error) {
      console.error('Error updating section title:', error);
      alert('Đã xảy ra lỗi khi cập nhật tiêu đề.');
    }
  };

  const handleCancelEditSection = () => {
    setEditingSectionId(null); // Thoát khỏi chế độ chỉnh sửa
    setNewSectionTitle('');
  };

  const handleDeleteLesson = async (sectionId, lessonId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài giảng này?')) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/course/${slug}/sections/${sectionId}/lessons/${lessonId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Không thể xóa bài giảng');

      alert('Xóa bài giảng thành công!');
      setSections((prevSections) =>
        prevSections.map((section) =>
          section._id === sectionId
            ? { ...section, lessons: section.lessons.filter((lesson) => lesson._id !== lessonId) }
            : section
        )
      );
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Đã xảy ra lỗi khi xóa bài giảng.');
    }
  };

  const handleEditLesson = (lessonId) => {
    navigate(`/lesson-edit/${lessonId}`); // Điều hướng đến trang lesson-edit với lessonId
  };

  const handleAddLessonClick = (sectionId) => {
    navigate(`/lesson-edit/${slug}/sections/${sectionId}/lesson/new`, {
      state: {
        sectionId,
        courseSlug: slug,
      },
    }); // Điều hướng đến trang thêm bài giảng
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
        {sections.map((section) => (
          <Box
            key={section._id}
            sx={{
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#fff',
              boxShadow: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {editingSectionId === section._id ? (
                <>
                  <TextField
                    variant="outlined"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    sx={{ flex: 1, mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveSectionTitle(section._id)}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelEditSection}
                  >
                    Hủy
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">{section.title}</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleExpandSection(section._id)}>
                      {expandedSection === section._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditSectionClick(section._id, section.title)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton color="success" onClick={() => handleAddLessonClick(section._id)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>

            <Collapse in={expandedSection === section._id} timeout="auto" unmountOnExit>
              <List sx={{ mt: 2 }}>
                {section.lessons.length > 0 ? (
                  section.lessons.map((lesson) => (
                    <ListItem
                      key={lesson._id}
                      sx={{
                        borderBottom: '1px solid #e0e0e0',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <ListItemText
                        primary={`${lesson.name || 'Chưa có tên'}`}
                        secondary={lesson.description}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          color="secondary"
                          onClick={() => handleEditLesson(lesson._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteLesson(section._id, lesson._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ pl: 2, color: 'gray' }}>
                    Chưa có bài giảng trong phần này
                  </Typography>
                )}
              </List>
            </Collapse>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />
    </Container>
  );
};

export default CourseEdit;