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
  }

};

export default courseApi;