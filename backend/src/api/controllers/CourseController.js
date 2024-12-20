const CourseService = require('../services/CourseService.js');

class CourseController {
    // Lấy danh sách tất cả các khóa học
    async getListCourse(req, res, next) {
        try {
            const courses = await CourseService.getListCourse();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // Lấy thông tin một khóa học theo slug
    async getCourse(req, res, next) {
        try {
            const course = await CourseService.getCourse(req.params.slug);
            res.json(course);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
        }
    }

    // Lấy danh sách tất cả bài giảng thuộc khóa học
    async getLessonsByCourseSlug(req, res, next) {
        try {
          const { slug } = req.params;
          const sections = await CourseService.getLessonsByCourseSlug(slug);
          res.status(200).json(sections);
        } catch (error) {
          res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
        }
      }

  // API thêm bài giảng vào section
  async addLessonToSection(req, res) {
    try {
      const { slug, sectionId } = req.params; // Lấy slug và sectionId từ URL
      const lessonData = req.body; // Dữ liệu bài giảng từ body request

      const newLesson = await CourseService.addLessonToSection(slug, sectionId, lessonData);

      res.status(201).json({
        message: 'Thêm bài giảng thành công',
        lesson: newLesson,
      });
    } catch (error) {
      console.error('Error adding lesson:', error);
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error: error.message,
      });
    }
  }

  // API xóa bài giảng khỏi section
  async removeLessonFromSection(req, res) {
    try {
      const { slug, sectionId, lessonId } = req.params; // Lấy slug, sectionId và lessonId từ URL

      const deletedLesson = await CourseService.removeLessonFromSection(slug, sectionId, lessonId);

      res.status(200).json({
        message: 'Xóa bài giảng thành công',
        deletedLesson,
      });
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({
        message: 'Lỗi máy chủ',
        error: error.message,
      });
    }
  }
}

module.exports = new CourseController();
