const SubjectService = require('../services/SubjectService');

class SubjectController {
  // Controller gọi service để lấy dữ liệu và xử lý response
  async getAllSubjects(req, res) {
    try {
      const subjects = await SubjectService.getAllSubjects(); // Gọi service
      return res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server.', error: error.message });
    }
  }
}

module.exports = new SubjectController();
