import React from 'react';
import { Box, Button } from '@mui/material';
import uploadApi from '~/api/uploadApi';
import lessonApi from '~/api/lessonApi';

const LessonActions = ({
  lessonData,
  lessonFiles,
  videoFile,
  isSubmitting,
  sectionId,
  courseSlug,
  setIsSubmitting,
  navigate,
}) => {
  const uploadFile = async (apiCall, file, key) => {
    try {
      const formData = new FormData();
      formData.append(key, file.file); // `file.file` must be a Blob/File object
      console.log("file : " + file);
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
      // Upload video if exists
      // alert(JSON.stringify(videoFile, null, 2));
      const videoResult = videoFile
        ? await uploadFile(uploadApi.uploadVideo, videoFile, 'video')
        : null;
      console.log(videoResult);
      // Upload documents
      const documentResults = await Promise.all(
        lessonFiles.map((file) =>
          uploadFile(uploadApi.uploadDocument, file, 'document')
        )
      );
      // alert(JSON.stringify(documentResults, null, 2));
      console.log(documentResults);

      // Prepare lesson payload
      const lessonPayload = {
        ...lessonData,
        videoUrl: videoResult?.link || '',
        duration: videoResult?.duration || 0,
        document: documentResults.map((doc, idx) => ({
          name: lessonFiles[idx].name,
          link: doc.link,
        })),
      };
  

      // alert(JSON.stringify(lessonPayload, null, 2));
      const response = await lessonApi.createLesson(courseSlug, sectionId, lessonPayload);

      
      if (!response) throw new Error('Failed to save lesson');
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
