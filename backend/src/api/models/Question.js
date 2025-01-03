const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  answerOptions: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
    unique: true,
  },
  explanation: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Tự động thêm các trường `createdAt` và `updatedAt`
});

// Tạo model từ schema
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
