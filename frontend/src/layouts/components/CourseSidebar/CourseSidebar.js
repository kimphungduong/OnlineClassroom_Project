import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Modal,
  TextField,
  Rating
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const CourseSidebar = ({ slugCourse, sections, progress, onSubmitReview }) => {
  const [expanded, setExpanded] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const handleLessonClick = (lesson) => {
    if (lesson.lessonType === 'Lesson') {
      navigate(`/course/${slugCourse}/${lesson.slug}`);
    } else {
      navigate(`/course/${slugCourse}/test/${lesson._id}`);
    }
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
    setRating(0);
    setComment('');
  };

  const handleSubmitReview = () => {
    const reviewData = {
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    onSubmitReview(reviewData); // Callback để gửi dữ liệu ra ngoài
    handleCloseReviewModal();
  };

  const isCourseCompleted = progress?.completedLessons === progress?.totalLessons;

  return (
    <Box sx={{ borderLeft: '1px solid #e0e0e0' }}>
      {sections?.map((section, index) => (
        <Accordion
          key={section._id}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: '#f5f5f5', padding: '8px 16px' }}
          >
            <Typography variant="h6">{`${index + 1}. ${section.title}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {section.lessons.map((lesson, lessonIndex) => (
                <ListItem key={lesson._id} disablePadding>
                  <ListItemButton onClick={() => handleLessonClick(lesson)}>
                    <ListItemText
                      primary={`${lessonIndex + 1}. ${lesson.name}`}
                      secondary={lesson.description}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      {isCourseCompleted && (
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleOpenReviewModal}>
            Đánh giá khóa học
          </Button>
        </Box>
      )}

      <Modal open={openReviewModal} onClose={handleCloseReviewModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Đánh giá khóa học
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Bình luận"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Box textAlign="right">
            <Button onClick={handleCloseReviewModal} sx={{ mr: 1 }}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSubmitReview} disabled={!rating || !comment}>
              Gửi
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CourseSidebar;
