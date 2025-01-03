const CourseService = require('../services/CourseService.js');

class CourseController{
    async getListCourse(req, res, next) {
        try {
        const courses = await CourseService.getListCourse();
        res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    // Controller sẽ xử lí lỗi. và gọi hàm của service
    async getMyCourse(req, res, next) {
        try {
            const courses = await CourseService.getMyCourse(req.user.userId);
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
    async getLession(req, res, next) {
        try {
            const lession = await CourseService.getLession(req.params.slug, req.params.slugLesson);
        res.json(lession);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    async getLessionById(req, res, next) {
        try {
            const lession = await CourseService.getLessionById(req.params.slug, req.params.id);
        res.json(lession);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    async getCourseWithLessons(req, res) {
        try {
            const { slug } = req.params;
            const courseData = await CourseService.getCourseWithLessons(slug);
            res.json(courseData);
        } catch (error) {
            if (error.message === 'Không tìm thấy khóa học') {
            return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi lấy thông tin khóa học', error });
        }
    }
    async getStudentProgress(req, res){
      try {
        const { courseSlug } = req.params; 
    
        // Gọi service để lấy dữ liệu
        const progressDetails = await CourseService.getStudentProgress(courseSlug);
    
        return res.status(200).json(progressDetails);
      } catch (error) {
        console.error(error);
        if (error.message === 'Course not found') {
          return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Server error' });
      }
    };

    async getNotes(req, res) {
        try {
            const { lessonId } = req.params;
            const notes = await CourseService.getNoteByLessonId(lessonId, req.user.userId);
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi lấy ghi chú', error });
        }
    }
    async addNote(req, res) {
        try {
            const { lessonId } = req.params;
            const { content, time } = req.body;
            const note = await CourseService.addNote(lessonId, req.user.userId, content, time);
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thêm ghi chú', error });
        }
    }
    async updateNote(req, res) {
        try {
            const { noteId } = req.params;
            const { content } = req.body;
            const note = await CourseService.updateNote(noteId, content);
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi cập nhật ghi chú', error });
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
