import axiosInstance from './axiosInstance';

const noteApi = {
  getNotes: (courseSlug, lessonId) => {
    return axiosInstance.get(`/${courseSlug}/${lessonId}/notes`);
  },
  
};

export default noteApi;