const Subject = require('../models/Subject');

class SubjectService {
  // Hàm lấy tất cả thể loại (không liên quan đến req, res)
  async getAllSubjects() {
    try {
      return await Subject.find().select('name _id');// Chỉ trả về dữ liệu
    } catch (error) {
      throw new Error('Lỗi khi truy vấn dữ liệu từ MongoDB: ' + error.message);
    }
  }
}

module.exports = new SubjectService();
