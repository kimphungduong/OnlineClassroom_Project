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
    return axiosInstance.get(`/course/${courseSlug}`).then(response => {
      console.log('Course data:', response.data); // Thêm log dữ liệu
      return response;
    });
  },

  getCoursesBySubject: (subjectSlug) => {
    return axiosInstance.get(`/course/subject/${subjectSlug}`).then(response => {
      console.log('Course data:', response.data); // Thêm log dữ liệu
      return response;
    });
  },
// gọi cái trên localhost:5000/course/sinh-hoc-co-ban là nó trả về thôgn tin 1 khoá học 
  // API làm mới token
  getLesson: (courseSlug,lessonSlug) => {
    return axiosInstance.get(`/course/${courseSlug}/${lessonSlug}`);
  },

  searchCourses: (query) => {
    return axiosInstance.get('/course/search', { params: { query } }); // Gửi từ khóa vào query string
  }

};

export default courseApi;