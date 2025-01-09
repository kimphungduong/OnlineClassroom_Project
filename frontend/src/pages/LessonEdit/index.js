import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Divider } from '@mui/material';
import LessonForm from './components/LessonForm';
import LessonActions from './components/LessonActions';
import FileList from './components/FileList';
import { UploadVideo, UploadDocuments } from '../../components/UploadFile';
import { useLocation, useNavigate } from 'react-router-dom';
import lessonApi from '~/api/lessonApi';

const LessonEdit = () => {
  const { courseSlug, lessonId } = useParams(); // Lấy courseSlug và lessonId từ URL
  const [lessonData, setLessonData] = useState({ name: '', description: '' });
  const [videoFile, setVideoFile] = useState(null);
  const [lessonFiles, setLessonFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // Lấy dữ liệu bài giảng
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await lessonApi.getLesson(courseSlug, lessonId);
        // fetch(`http://localhost:5000/api/course/${courseSlug}/lesson/${lessonId}`);
        if (!response) throw new Error('Failed to fetch lesson');
        const data = await response.data;
        
        // Điền dữ liệu vào state
        setLessonData({ name: data.name, description: data.description });
        setVideoFile(data.videoUrl ? { name: data.videoUrl} : null);
        setLessonFiles(data.document || []);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };

    fetchLessonData();
  }, [courseSlug, lessonId]);

  // Xử lý video
  const handleVideoSubmit = (file) => setVideoFile(file);
  const handleVideoDelete = () => setVideoFile(null);

  // Xử lý tài liệu
  const handleDocumentSubmit = (files) => setLessonFiles((prev) => [...prev, ...files]);
  const handleDocumentDelete = (index) =>
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
        Chỉnh sửa bài giảng
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        {/* Form nhập thông tin bài học */}
        <LessonForm lessonData={lessonData} setLessonData={setLessonData} />

        {/* Upload và quản lý video */}
        <UploadVideo onSubmit={handleVideoSubmit} />
        {videoFile && (
          <FileList files={[{ name: videoFile.name }]} onDeleteFile={handleVideoDelete} />
        )}

        {/* Upload và quản lý tài liệu */}
        <UploadDocuments onSubmit={handleDocumentSubmit} />
        {lessonFiles.length > 0 && (
          <FileList
            files={lessonFiles.map((doc) => ({ name: doc.name }))}
            onDeleteFile={handleDocumentDelete}
          />
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Nút lưu bài học */}
        <LessonActions
          lessonData={lessonData}
          lessonFiles={lessonFiles}
          videoFile={videoFile}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit} // Truyền hàm submit
          setIsSubmitting={setIsSubmitting}
          lessonId={lessonId}
          courseSlug={courseSlug}
          navigate={navigate}
        />
      </Paper>
    </Container>
  );
};

export default LessonEdit;
