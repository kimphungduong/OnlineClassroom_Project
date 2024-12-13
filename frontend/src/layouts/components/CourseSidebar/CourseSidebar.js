import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CourseSidebar = () => {
  // Dữ liệu các phần và bài học
  const sections = [
    {
      title: 'Phần 1: Giới thiệu khóa học',
      lessons: [
        'Lưu ý trước khi học',
        'Cách học hiệu quả',
        'Hướng dẫn sử dụng tài liệu'
      ]
    },
    {
      title: 'Phần 2: Giới thiệu về đạo hàm',
      lessons: [
        'Ví dụ dẫn vào bài',
        'Công thức cơ bản của đạo hàm',
        'Sửa bài tập'
      ]
    },
    {
      title: 'Phần 3: Các bài toán nâng cao',
      lessons: [
        'Tính đạo hàm của các hàm phức tạp',
        'Ứng dụng đạo hàm trong kinh tế',
        'Sử dụng đạo hàm để tối ưu hóa'
      ]
    }
  ];

  // State để quản lý các phần mở rộng (expanded)
  const [expanded, setExpanded] = useState(false);

  // Hàm để thay đổi trạng thái mở rộng của phần
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ borderLeft: '1px solid #e0e0e0' }}>
      {sections.map((section, index) => (
        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              padding: '8px 16px',
            }}
          >
            <Typography variant="h6">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '8px 16px' }}>
            <List>
              {section.lessons.map((lesson, i) => (
                <ListItem key={i} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={lesson} />
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
