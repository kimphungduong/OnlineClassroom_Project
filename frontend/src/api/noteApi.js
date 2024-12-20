import axiosInstance from './axiosInstance';

const noteApi = {
  getNotes: (courseSlug, lessonId) => {
    return axiosInstance.get(`/${courseSlug}/${lessonId}/notes`);
  },
  addNote: (lessonId, content, time) => {
    return axiosInstance.post(`/${lessonId}/notes`, { content, time });
  }
};

export default noteApi;