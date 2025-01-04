import axiosInstance from './axiosInstance';

const questionApi = {
  // Create a new question
  createQuestion: (questionData) => {
    return axiosInstance.post('/question', questionData);
  },

  // Get all questions
  getAllQuestions: () => {
    return axiosInstance.get('/question');
  },

  // Get a question by ID
  getQuestionById: (questionId) => {
    return axiosInstance.get(`/question/${questionId}`);
  },

  // Update a question
  updateQuestion: (questionId, updatedData) => {
    return axiosInstance.put(`/question/${questionId}`, updatedData);
  },

  // Delete a question
  deleteQuestion: (questionId) => {
    return axiosInstance.delete(`/question/${questionId}`);
  },
};

export default questionApi;
