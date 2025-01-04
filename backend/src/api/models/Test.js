const mongoose = require('mongoose');
const submission = require('./submission');
const Question = require('./question');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],  // Danh sách câu hỏi
  createdAt: { type: Date, default: Date.now },
  submission: [submission]
});

module.exports = mongoose.model('Test', testSchema);
