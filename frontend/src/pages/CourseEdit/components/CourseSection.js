import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteSectionButton from './DeleteSectionButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseSection = ({ section, slug, setSections, setMenuAnchor, setSelectedSectionId }) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState(section.title);
  const navigate = useNavigate();

  const handleExpandSection = () => {
    setExpandedSection((prev) => !prev);
  };

  const handleEditSectionClick = () => {
    setEditingSectionId(section._id);
  };

  const handleSaveSectionTitle = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/course/${slug}/section/${section._id}`,
        { title: newSectionTitle }
      );
  
      // Cập nhật danh sách sections từ phản hồi của API
      setSections((prevSections) =>
        prevSections.map((s) =>
          s._id === section._id ? { ...s, title: newSectionTitle } : s
        )
      );
      setEditingSectionId(null);
      alert('Cập nhật tiêu đề thành công!');
    } catch (error) {
      console.error('Error updating section title:', error);
      alert('Lỗi khi cập nhật tiêu đề.');
    }
  };

  const handleDeleteSection = () => {
    setSections((prevSections) => prevSections.filter((s) => s._id !== section._id));
  };

  const handleAddLessonClick = (event) => {
    setMenuAnchor(event.currentTarget);
    setSelectedSectionId(section._id);
  };

  const handleEditLessonClick = (lessonId) => {
    navigate(`/lesson-edit/${slug}/sections/${section._id}/lesson/${lessonId}`, {
      state: {
        lessonId,
        sectionId: section._id,
        courseSlug: slug,
      },
    });
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson? This will also delete all associated documents.')) {
      return;
    }
  
    try {
      // Gửi yêu cầu xóa bài học đến backend
      const response = await fetch(
        `http://localhost:5000/api/course/${slug}/${section._id}/${lessonId}`,
        {
          method: 'DELETE',
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }
  
      // Xóa bài học khỏi state frontend nếu backend xóa thành công
      const updatedLessons = section.lessons.filter((lesson) => lesson._id !== lessonId);
      const updatedSection = { ...section, lessons: updatedLessons };
      setSections((prevSections) =>
        prevSections.map((s) => (s._id === section._id ? updatedSection : s))
      );
  
      alert('Lesson and associated documents deleted successfully!');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Error deleting lesson');
    }
  };

  return (
    <Box
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
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 1, mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveSectionTitle}>
              Lưu
            </Button>
          </>
        ) : (
          <Typography variant="h6">{section.title}</Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary" onClick={handleExpandSection}>
            {expandedSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>

          <IconButton color="success" onClick={handleAddLessonClick}>
            <AddIcon />
          </IconButton>
          <DeleteSectionButton slug={slug} sectionId={section._id} setSections={setSections} />
          <IconButton color="secondary" onClick={handleEditSectionClick}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expandedSection} timeout="auto" unmountOnExit>
        <List sx={{ mt: 2 }}>
          {section.lessons.map((lesson) => (
            <ListItem
              key={lesson._id}
              sx={{ borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}
            >
              <ListItemText primary={lesson.name} secondary={lesson.description} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  color="secondary"
                  onClick={() => handleEditLessonClick(lesson._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteLesson(lesson._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

export default CourseSection;
