import axiosInstance from './axiosInstance';

const courseApi = {
  createCourse: (courseData) => {
    return axiosInstance.post('/course/new', courseData);
  },
  updateCourse: (courseSlug, courseData) => {
    return axiosInstance.put(`/course/course-info/${courseSlug}/edit`, courseData);
  },
  // API đăng nhập
  getListCourse: () => {
    return axiosInstance.get('/course');
  },
  getMyCourse: () => {
    return axiosInstance.get(`/course/my-courses`);
  },
  // API đăng ký
  getCourse: (courseSlug) => {
    return axiosInstance.get(`/course/${courseSlug}`).then(response => {
      console.log('Course data:', response.data); // Thêm log dữ liệu
      return response;
    });
  },
  getCourseLearn: (courseSlug) => {
    return axiosInstance.get(`/course/learn/${courseSlug}`).then(response => {
      return response;
    });
  },
  getCoursesBySubject: (subjectSlug) => {
    return axiosInstance.get(`/course/subject/${subjectSlug}`).then(response => {
      console.log('Course data:', response.data); // Thêm log dữ liệu
      return response;
    });
  },
  getCourseInfo: (courseSlug) => {
    return axiosInstance.get(`/course/course-info/${courseSlug}`);
  },
// gọi cái trên localhost:5000/course/sinh-hoc-co-ban là nó trả về thôgn tin 1 khoá học 
  // API làm mới token
  getLesson: (courseSlug,lessonSlug) => {
    return axiosInstance.get(`/course/${courseSlug}/${lessonSlug}`);
  },

  // Hi , toi la quang cao hehe
  addPost: (courseSlug, data) => {
    return axiosInstance.post(`/course/${courseSlug}/forum/add-post`, data);
  },

  // API lấy bài đăng từ diễn đàn
  getForumPosts: (courseSlug) => {
    return axiosInstance.get(`/course/${courseSlug}/forum`);
  },

  // API lấy chi tiết bài đăng
  getForumPostDetail: (courseSlug, postId) => {
    return axiosInstance.get(`/course/${courseSlug}/forum/${postId}`);
  },

  addComment: (courseSlug, postId, data) => {
    return axiosInstance.post(`/course/${courseSlug}/forum/${postId}/add-comment`, data);
  },

  voteComment: (courseSlug, postId, commentId, value) => {
    return axiosInstance.post(`/course/${courseSlug}/forum/${postId}/vote-comment`, { commentId, value });
  },

  votePost: (courseSlug, postId, value) => {
    return axiosInstance.post(`/course/${courseSlug}/forum/${postId}/vote-post`, { value });
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

  searchCourses: (query) => {
    return axiosInstance.get('/search', { params: { query } }); // Gửi từ khóa vào query string

  },
  markLessonAsCompleted: (lessonId) => {
    return axiosInstance.put(`/course/${lessonId}/completed`);
  },
  getRecommendedCourses: () => {
    return axiosInstance.get('/course/recommended');
  }

};

export default courseApi;