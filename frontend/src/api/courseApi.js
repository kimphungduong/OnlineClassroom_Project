import axiosInstance from './axiosInstance';

const courseApi = {
  // API đăng nhập
  getListCourse: () => {
    return axiosInstance.get('/course');
  },
  getMyCourse: () => {
    return axiosInstance.get(`/course/my-courses`);
  },
  // API đăng ký
  getCourse: (courseSlug) => {
    return axiosInstance.get(`/course/${courseSlug}`);
  },

  // API làm mới token
  getLesson: (courseSlug,lessonSlug) => {
    return axiosInstance.get(`/course/${courseSlug}/${lessonSlug}`);
  },

  getCourseReviews: (slug, page) =>
    axiosInstance.get(`/review/${slug}/stat?page=${page}&limit=5`),

  updateSectionTitle: (courseSlug, sectionId, title) => {
    return axiosInstance.put(`/course/${courseSlug}/sections/${sectionId}`, { title });
  },
};

export default courseApi;