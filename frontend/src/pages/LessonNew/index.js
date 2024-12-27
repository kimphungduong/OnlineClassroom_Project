import React, { useState } from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LessonForm from './components/LessonForm';
import LessonActions from './components/LessonActions';
import FileList from './components/FileList';
import { UploadVideo, UploadDocuments } from '../../components/UploadFile/index';

const LessonNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionId, courseSlug } = location.state || {};
  const [lessonData, setLessonData] = useState({ name: '', description: '' });
  const [lessonFiles, setLessonFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVideoSubmit = (file) => setVideoFile(file);
  const handleVideoDelete = () => setVideoFile(null);

  const handleDocumentSubmit = (files) => setLessonFiles((prev) => [...prev, ...files]);
  const handleDeleteFile = (index) =>
    setLessonFiles((prev) => prev.filter((_, idx) => idx !== index));


  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Xử lý submit lên API ở đây
    // Ví dụ:
    // const response = await fetch('/api/lessons', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Add New Lesson
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <LessonForm lessonData={lessonData} setLessonData={setLessonData} />
        <UploadVideo onSubmit={handleVideoSubmit} />
        {videoFile && (
          <FileList files={[{ name: videoFile.name }]} onDeleteFile={handleVideoDelete} />
        )}
        <UploadDocuments onSubmit={handleDocumentSubmit} />
        {lessonFiles.length > 0 && (
          <FileList
            files={lessonFiles.map((doc) => ({ name: doc.name }))}
            onDeleteFile={handleDeleteFile}
          />
        )}
        <Divider sx={{ mb: 2 }} />
        <LessonActions
          lessonData={lessonData}
          lessonFiles={lessonFiles}
          videoFile={videoFile}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit} // Truyền hàm submit
          setIsSubmitting={setIsSubmitting}
          sectionId={sectionId}
          courseSlug={courseSlug}
          navigate={navigate}
        />
      </Paper>
    </Container>
  );
};

export default LessonNew;
