const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  username: { type: String, required: true, unique: true, default: '' },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' },
  registeredCourses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Tham chiếu đến khóa học
      startDate: { type: Date }, // Thời gian bắt đầu (liên quan đến học viên)
      endDate: { type: Date }   // Thời gian kết thúc (liên quan đến học viên)
    }
  ],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  createdAt: { type: Date, default: Date.now }
});

// Middleware mã hóa mật khẩu
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Phương thức so sánh mật khẩu
studentSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
