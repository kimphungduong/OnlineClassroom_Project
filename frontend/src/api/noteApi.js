import axiosInstance from './axiosInstance';

const noteApi = {
  getNotes: (courseSlug, lessonId) => {
    return axiosInstance.get(`/course/${courseSlug}/${lessonId}/notes`);
  },
  addNote: (lessonId, content, time) => {
    return axiosInstance.post(`/course/${lessonId}/notes`, { content, time });
  },
  updateNote: (noteId, content) => {
    return axiosInstance.put(`/note/${noteId}`, content);
  },
  deleteNote: (noteId) => {
    return axiosInstance.delete(`/note/${noteId}`);
  },
  getNotesGroupedByCourse: (courseId  ) => {
    return axiosInstance.get(`/note/all/${courseId}/`);
  },

};

export default noteApi;