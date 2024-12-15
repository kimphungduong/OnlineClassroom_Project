const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  score: { type: Number, required: true },
  timeSpent: { type: Number, required: true },  // Thời gian làm bài (giây)
  submittedAt: { type: Date, default: Date.now }
});

module.exports = submissionSchema;
