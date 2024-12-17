const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  username: { type: String, required: true, unique: true, default: '' },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, default: 'teacher' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Teacher', teacherSchema);
