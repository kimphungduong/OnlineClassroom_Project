const TeacherService = require("../services/TeacherService");

class TeacherController {
  // Lấy thông tin giáo viên theo ID
  async getTeacherById(req, res) {
    try {
      const teacher = await TeacherService.getTeacherById(req.params.id);
      if (!teacher) {
        return res.status(404).json({ success: false, message: "Teacher not found" });
      }
      res.status(200).json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Cập nhật thông tin giáo viên
  async updateCourseTeacher(req, res) {
    try {
      const teacher = await TeacherService.updateCourseTeacher(req.params.id, req.body);
      if (!teacher) {
        return res.status(404).json({ success: false, message: "Teacher not found" });
      }
      res.status(200).json({ success: true, data: teacher });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new TeacherController();
