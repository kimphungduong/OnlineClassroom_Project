import axiosInstance from './axiosInstance';

const courseApi = {
  // API đăng nhập
  getListCourse: () => {
    return axiosInstance.get('/');
  },
  getMyCourse: () => {
    return axiosInstance.get(`/my-courses`);
  },
  // API đăng ký
  getCourse: (courseSlug) => {
    return axiosInstance.get(`/${courseSlug}`);
  },

  // API làm mới token
  getLesson: (courseSlug,lessonSlug) => {
    return axiosInstance.get(`/${courseSlug}/${lessonSlug}`);
  },
};

export default courseApi;