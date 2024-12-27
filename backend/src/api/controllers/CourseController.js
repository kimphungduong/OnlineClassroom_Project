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

  async getCourse(req, res, next) {
    try {
    const course = await CourseService.getCourse(req.params.slug);
    res.json(course);
    } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
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

  // Cập nhật tiêu đề section
  async updateSectionTitle(req, res) {
    try {
      const { courseSlug, sectionId } = req.params;
      const { title } = req.body;
  
      const updatedSections = await CourseService.updateSectionTitle(courseSlug, sectionId, title);
  
      res.status(200).json({ message: 'Cập nhật tiêu đề thành công', sections: updatedSections });
    } catch (error) {
      console.error('Error updating section title:', error);
      res.status(500).json({ message: error.message });
    }
  };

  async addSection(req, res){
    try {
      const { courseSlug } = req.params;
      const { title } = req.body;
  
      const updatedSections = await CourseService.addSection(courseSlug, title);
  
      res.status(200).json({ message: 'Thêm phần mới thành công', sections: updatedSections });
    } catch (error) {
      console.error('Error adding new section:', error);
      res.status(500).json({ message: error.message });
    }
  };

  async deleteSection (req, res) {
    try {
      const { courseSlug, sectionId } = req.params;
  
      const updatedSections = await CourseService.deleteSection(courseSlug, sectionId);
  
      res.status(200).json({ message: 'Xóa phần thành công', sections: updatedSections });
    } catch (error) {
      console.error('Error deleting section:', error);
      res.status(500).json({ message: error.message });
    }
  };  

 
}

module.exports = new CourseController();
