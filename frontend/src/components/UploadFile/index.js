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
import { useEffect } from 'react';
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


const UploadImage = ({ onPreview, imagePreviewUrl }) => {
  const [imageFile, setImageFile] = useState(null); // Lưu trữ File object
  const [imagePreview, setImagePreview] = useState(imagePreviewUrl || null); // Lưu trữ URL preview

  useEffect(() => {
    if (imagePreviewUrl) {
      setImagePreview(imagePreviewUrl); // Hiển thị ảnh cũ nếu có
    }
  }, [imagePreviewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Tạo URL preview từ file ảnh
      reader.onload = () => {
        setImageFile(file); // Lưu File object
        setImagePreview(reader.result); // Cập nhật URL preview
        onPreview(file, reader.result); // Gửi file và preview URL cho component cha
      };

      // Đọc file dưới dạng data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Image
      </Typography>
      <Box
        sx={{
          border: "2px dashed #aaa",
          borderRadius: 2,
          textAlign: "center",
          p: 4,
          backgroundColor: "#f9f9f9",
          position: "relative",
        }}
      >
        <input
          type="file"
          id="file-input-image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-input-image">
          <UploadFileIcon fontSize="large" color="action" />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Click or drag an image file to upload
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Support for image uploads only.
          </Typography>
        </label>
      </Box>

      {/* Hiển thị ảnh preview hoặc ảnh từ URL cũ */}
      {imagePreview && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <img
            src={imagePreview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export { UploadImage, UploadVideo, UploadDocuments };
