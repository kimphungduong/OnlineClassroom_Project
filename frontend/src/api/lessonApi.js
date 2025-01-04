import axiosInstance from './axiosInstance';

const lessonApi = {
  // Create a new lesson
  createLesson: (courseSlug, sectionId, lessonData) => {
    return axiosInstance.post(`/course/${courseSlug}/${sectionId}/lesson`, lessonData);
  },

  // Delete a lesson
  deleteLesson: (courseSlug, sectionId, lessonId) => {
    return axiosInstance.delete(`/course/${courseSlug}/${sectionId}/lesson/${lessonId}`);
  },

  // Get lesson details
  getLesson: (courseSlug, lessonId) => {
    return axiosInstance.get(`/course/${courseSlug}/lesson/${lessonId}`);
  },

  // Update a lesson
  updateLesson: (courseSlug, lessonId, updatedLessonData) => {
    return axiosInstance.put(`/course/${courseSlug}/${lessonId}`, updatedLessonData);
  },
};

export default lessonApi;
