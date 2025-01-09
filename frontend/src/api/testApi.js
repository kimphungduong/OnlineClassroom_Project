import axiosInstance from './axiosInstance';

const testApi = {
  // Create a new test
  createTest: (courseSlug, sectionId, testData) => {
    return axiosInstance.post(`/course/${courseSlug}/${sectionId}/test`, testData);
  },

  // Delete a test
  deleteTest: (courseSlug, sectionId, testId) => {
    return axiosInstance.delete(`/course/${courseSlug}/${sectionId}/test/${testId}`);
  },

  // Get test details
  getTest: (courseSlug, testId) => {
    return axiosInstance.get(`/course/${courseSlug}/test/${testId}`);
  },

  // Update a test
  updateTest: (courseSlug, testId, updatedTestData) => {
    return axiosInstance.put(`/course/${courseSlug}/test/${testId}`, updatedTestData);
  },

  // Add a test submission
  addSubmission: (courseSlug, testId, submissionData) => {
    return axiosInstance.put(`/course/${courseSlug}/test/${testId}/submission`, submissionData);
  },
};

export default testApi;
