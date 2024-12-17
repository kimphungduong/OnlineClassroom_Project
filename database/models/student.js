const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  username: { type: String, required: true, unique: true, default: '' },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' },
  registeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
