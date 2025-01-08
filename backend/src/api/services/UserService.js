
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

class UserService {
  async findUserByEmail(email) {
    const student = await Student
      .findOne({ email });
    if (student) {
      return student;
    }
    const teacher = await Teacher
      .findOne({ email })
      .select('_id username email');
    if (teacher) {
      return teacher;
    }
  }
  async findUserById(userId) {
    const student = await Student
      .findById(userId);
    if (student) {
      return student;
    }
    const teacher = await Teacher
      .findById(userId);
    if (teacher) {
      return teacher;
    }
  }
}

module.exports = new UserService();