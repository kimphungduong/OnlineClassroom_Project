const Teacher = require("../models/Teacher");

class TeacherService {
  // Lấy thông tin giáo viên theo ID
  async getTeacherById(id) {
    return Teacher.findById(id).populate("courses");
  }

  // Cập nhật thông tin giáo viên
  async updateCourseTeacher(id, updateData) {
    return Teacher.findByIdAndUpdate(id, updateData, { new: true });
  }

}

module.exports = new TeacherService();