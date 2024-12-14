const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  questions: [{ type: String, required: true }],  // Danh sách câu hỏi
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
