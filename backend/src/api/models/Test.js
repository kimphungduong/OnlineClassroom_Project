const mongoose = require('mongoose');
const submission = require('./Submission');
const Question = require('./Question');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],  // Danh sách câu hỏi
  createdAt: { type: Date, default: Date.now },
  submission: [submission]
});

module.exports = mongoose.model('Test', testSchema);
