import axiosInstance from './axiosInstance';

const uploadApi = {
  // Upload a video file
  uploadVideo: (formData) => {
    return axiosInstance.post('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Upload a document file
  uploadDocument: (formData) => {
    return axiosInstance.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete a file
  deleteFile: (filePath) => {
    return axiosInstance.delete('/upload/delete-file', {
      data: { path: filePath }, // Send file path in the request body
    });
  },
};

export default uploadApi;
