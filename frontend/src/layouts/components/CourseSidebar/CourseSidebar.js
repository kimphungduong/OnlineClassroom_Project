import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const CourseSidebar = ({ slugCourse ,sections }) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleLessonClick = (lesson) => {
    if(lesson.lessonType === 'Lesson') {
      navigate(`/course/${slugCourse}/${lesson.slug}`);
    } else {
      navigate(`/course/${slugCourse}/test/${lesson._id}`);
    }
  };


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ borderLeft: '1px solid #e0e0e0' }}>
      {sections?.map((section, index) => (
        <Accordion key={section._id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f5f5f5', padding: '8px 16px' }}>
            <Typography variant="h6">{`${index + 1}. ${section.title}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <List>
              {section.lessons.map((lesson,index) => (
                <ListItem key={lesson._id} disablePadding>
                  <ListItemButton onClick={() => handleLessonClick(lesson)}>
                    <ListItemText primary={`${index + 1}. ${lesson.name}`} secondary={lesson.description} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CourseSidebar;
