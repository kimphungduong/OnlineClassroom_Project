import React from 'react';
import { Box, TextField } from '@mui/material';

const LessonForm = ({ lessonData, setLessonData }) => {
  const handleChange = (field, value) => {
    setLessonData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Lesson Name"
        fullWidth
        value={lessonData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Lesson Description"
        fullWidth
        multiline
        rows={4}
        value={lessonData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default LessonForm;
