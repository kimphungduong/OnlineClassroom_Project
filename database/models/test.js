const mongoose = require('mongoose');
const submission = require('./submission');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  questions: [{ type: String, required: true }],  // Danh sách câu hỏi
  createdAt: { type: Date, default: Date.now },
  submission: [submission]
});

module.exports = mongoose.model('Test', testSchema);
