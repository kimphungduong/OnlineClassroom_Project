
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
  getAllEmails() {
    return Promise.all([
      Student.find().select('email'),
      Teacher.find().select('email')
    ]).then(([students, teachers]) => {
      return students.concat(teachers).map(user => user.email);
    });
  }
  getAllPhones() {
    return Promise.all([
      Student.find().select('phone'),
      Teacher.find().select('phone')
    ]).then(([students, teachers]) => {
      return students.concat(teachers).map(user => user.phone);
    });
  }
}

module.exports = new UserService();