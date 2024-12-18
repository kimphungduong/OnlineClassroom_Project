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
  Divider,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UploadComponent = ({ onSubmit, onCancel }) => {
  const [tab, setTab] = useState('file');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setFileName('');
    setFile(null);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit({ fileName, file });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Video" value="video" />
        <Tab label="File" value="file" />
      </Tabs>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField
          label="File Name"
          variant="outlined"
          size="small"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      {/* File Upload Section */}
      <Box
        sx={{
          border: '2px dashed #aaa',
          borderRadius: 2,
          textAlign: 'center',
          p: 4,
          backgroundColor: '#f9f9f9',
        }}
      >
        <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="file-input">
          <UploadFileIcon fontSize="large" color="action" />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Click or drag file to this area to upload
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Support for a single file upload only.
          </Typography>
        </label>
        {file && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Uploaded: {file.name}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default UploadComponent;
