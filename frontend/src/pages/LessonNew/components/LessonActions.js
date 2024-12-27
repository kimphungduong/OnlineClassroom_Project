import React from 'react';
import { Box, Button } from '@mui/material';

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
  const uploadFile = async (endpoint, file, key) => {
    const formData = new FormData();
    formData.append(key, file.file); // `file.file` phải là một Blob/File object
  
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
      console.log('Upload result:', result);
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
      // Upload video if exists
      const videoResult = videoFile
        ? await uploadFile('http://localhost:5000/api/upload/video', videoFile, 'video')
        : null;
      // alert(JSON.stringify(videoResult, null, 2));

      // Upload documents
      const documentResults = await Promise.all(
        lessonFiles.map((file) =>
          uploadFile('http://localhost:5000/api/upload/document', file, 'document')
        )
      );
      // alert(JSON.stringify(documentResults, null, 2));

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
      const response = await fetch(
        `http://localhost:5000/api/course/${courseSlug}/${sectionId}/lesson`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lessonPayload),
        }
      );

      
      if (!response.ok) throw new Error('Failed to save lesson');
      alert('Lesson created successfully!');
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert('Error creating lesson');
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
