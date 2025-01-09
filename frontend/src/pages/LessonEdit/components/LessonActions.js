import React from 'react';
import { Box, Button } from '@mui/material';
import uploadApi from '~/api/uploadApi';
import lessonApi from '~/api/lessonApi';

const LessonActions = ({
  lessonData,
  lessonFiles,
  videoFile,
  isSubmitting,
  lessonId,
  courseSlug,
  setIsSubmitting,
  navigate,
}) => {
  const uploadFile = async (apiCall, file, key) => {
    try {
      const formData = new FormData();
      formData.append(key, file.file); // `file.file` must be a Blob/File object
      console.log(file);
      const response = await apiCall(formData);
      return response.data;
    } catch (error) {
      console.error(`Error uploading ${key}:`, error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!lessonData.name) {
      alert('Please provide lesson details.');
      return;
    }

    setIsSubmitting(true);

    try {
        const videoResult = videoFile?.file
        ? await uploadFile(uploadApi.uploadVideo, videoFile, 'video')
        //  uploadFile('http://localhost:5000/api/upload/video', videoFile, 'video')
        : { link: videoFile?.link || videoFile?.name || '', duration: videoFile?.duration || 0 };
    
      // Upload tài liệu nếu có tài liệu mới
      const documentResults = await Promise.all(
        lessonFiles.map((file) =>
          file.link // Nếu file có thuộc tính `link` (file cũ), giữ nguyên
            ? { link: file.link, name: file.name }
            : uploadFile(uploadApi.uploadDocument, file, 'document')
            // uploadFile('http://localhost:5000/api/upload/document', file, 'document')
        )
      );

      // Payload bài học
      const lessonPayload = {
        ...lessonData,
        videoUrl: videoResult.link,
        duration: videoResult.duration,
        document: documentResults.map((doc, idx) => ({
          name: lessonFiles[idx].name,
          link: doc.link,
        })),
      };
      // alert(JSON.stringify(lessonPayload, null, 2));
      // alert(lessonId);
      const response = await lessonApi.updateLesson(courseSlug, lessonId, lessonPayload);
      //  fetch(
      //   `http://localhost:5000/api/course/${courseSlug}/${lessonId}`,
      //   {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(lessonPayload),
      //   }
      // );

      if (!response) throw new Error('Failed to update lesson');
      alert('Tạo bài thành công!');
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tạo bài');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Lesson'}
      </Button>
    </Box>
  );
};

export default LessonActions;
