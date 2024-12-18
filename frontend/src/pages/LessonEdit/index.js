import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Container,
  Divider,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadComponent from '../../components/UploadFile/UploadComponent';

const EditLesson = () => {
  const [lessonFiles, setLessonFiles] = useState([]);

  const handleUploadSubmit = (newFile) => {
    setLessonFiles([...lessonFiles, newFile]);
  };

  const handleUploadCancel = () => {
    console.log('Upload canceled');
  };

  const handleDeleteFile = (index) => {
    setLessonFiles(lessonFiles.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Chỉnh sửa bài giảng
      </Typography>

      <UploadComponent onSubmit={handleUploadSubmit} onCancel={handleUploadCancel} />

      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Uploaded Files
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {lessonFiles.length > 0 ? (
          lessonFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="body1">{file.fileName || file.file.name}</Typography>
              <IconButton color="error" onClick={() => handleDeleteFile(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No files uploaded yet.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default EditLesson;
