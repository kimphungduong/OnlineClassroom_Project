import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadVideo = ({ onSubmit, onCancel }) => {
  const [video, setVideo] = useState(null);

  const handleFileUpload = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleCancel = () => {
    setVideo(null);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (!video) {
      alert('Vui lòng chọn video!');
      return;
    }
    if (onSubmit) {
      onSubmit({ name: video.name, file: video });
    }
    setVideo(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Video
      </Typography>
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
          id="file-input-video"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="file-input-video">
          <UploadFileIcon fontSize="large" color="action" />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Click or drag video to this area to upload
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Support for a single video upload only.
          </Typography>
        </label>
      </Box>
      {video && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Uploaded Video: {video.name}
        </Typography>
      )}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};
const UploadDocuments = ({ onSubmit, onCancel }) => {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files); // Hỗ trợ chọn nhiều file
    setDocuments((prevDocs) => [...prevDocs, ...uploadedFiles]);
  };

  const handleDeleteDocument = (index) => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setDocuments([]);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (documents.length === 0) {
      alert('Vui lòng chọn ít nhất một tài liệu!');
      return;
    }
    if (onSubmit) {
      onSubmit(documents.map((doc) => ({ name: doc.name, file: doc }))); // Tạo đối tượng { name, file }
    }
    setDocuments([]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Documents
      </Typography>
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
          id="file-input-document"
          multiple // Cho phép chọn nhiều file
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="file-input-document">
          <UploadFileIcon fontSize="large" color="action" />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Click or drag files to this area to upload
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Support for multiple document uploads.
          </Typography>
        </label>
      </Box>
      {documents.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {documents.map((doc, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>{doc.name}</Typography>
              <IconButton onClick={() => handleDeleteDocument(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export { UploadVideo, UploadDocuments };
