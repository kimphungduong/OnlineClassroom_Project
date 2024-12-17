const Course = require('../models/Course'); // Điều chỉnh đường dẫn nếu cần
const Lesson = require('../models/Lesson');

class CourseService {
  async getListCourse() {
    try {
      const courses = await Course.find({});
      return courses;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách khóa học');
    }
  }

  async getCourse(slug) {
    try {
      const course = await Course.findOne({ slug });
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      return course;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin khóa học');
    }
  }
  async getLession(slug, slugLesson) {
    try {
      const course = await Course.findOne({ slug });
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      const lesson = await Lesson.findOne({ slug: slugLesson, course: course._id });
      if (!lesson) {
        throw new Error('Bài học không tồn tại');
      }
      return lesson;
    }catch (error) {
      throw new Error('Lỗi khi lấy thông tin bài học');
    }
  }
}

module.exports = new CourseService();