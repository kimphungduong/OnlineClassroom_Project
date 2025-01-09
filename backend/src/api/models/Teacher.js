const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  username: { type: String, required: true, unique: true, default: '' },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  avatar: { type: String, default: '/img/default-avatar.png' },
  role: { type: String, default: 'teacher' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

// Middleware mã hóa mật khẩu
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Phương thức so sánh mật khẩu
teacherSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
