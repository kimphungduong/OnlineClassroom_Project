import React from 'react';
import { Box, Button } from '@mui/material';

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
  const uploadFile = async (endpoint, file, key) => {
    const formData = new FormData();
    formData.append(key, file.file);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'File upload failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
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
        ? await uploadFile('http://localhost:5000/api/upload/video', videoFile, 'video')
        : { link: videoFile?.link || videoFile?.name || '', duration: videoFile?.duration || 0 };
    
      // Upload tài liệu nếu có tài liệu mới
      const documentResults = await Promise.all(
        lessonFiles.map((file) =>
          file.link // Nếu file có thuộc tính `link` (file cũ), giữ nguyên
            ? { link: file.link, name: file.name }
            : uploadFile('http://localhost:5000/api/upload/document', file, 'document')
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
      const response = await fetch(
        `http://localhost:5000/api/course/${courseSlug}/${lessonId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lessonPayload),
        }
      );

      if (!response.ok) throw new Error('Failed to update lesson');
      alert('Lesson updated successfully!');
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('Error updating lesson');
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
