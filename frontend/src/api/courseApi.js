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
// gọi cái trên localhost:5000/course/sinh-hoc-co-ban là nó trả về thôgn tin 1 khoá học 
  // API làm mới token
  getLesson: (courseSlug,lessonSlug) => {
    return axiosInstance.get(`/course/${courseSlug}/${lessonSlug}`);
  },

  // Get lessons of a course
  getLessonsByCourseSlug: (courseSlug) => {
    return axiosInstance.get(`/course/${courseSlug}/lessons`);
  },

  getStudentProgress: (slug) => {
    return axiosInstance.get(`/course/${slug}/progress`);
  },

  // Get lesson by ID for learning
  getLessonById: (courseSlug, lessonId) => {
    return axiosInstance.get(`/course/${courseSlug}/${lessonId}/learn`);
  },

  updateSectionTitle: (courseSlug, sectionId, titleData) => {
    return axiosInstance.put(`/course/${courseSlug}/section/${sectionId}`, titleData);
  },
  // Add a new section to a course
  addSection: (courseSlug, sectionData) => {
    return axiosInstance.post(`/course/${courseSlug}/section`, sectionData);
  },
  // Delete a section by ID
  deleteSection: (courseSlug, sectionId) => {
    return axiosInstance.delete(`/course/${courseSlug}/section/${sectionId}`);
  },
};

export default courseApi;