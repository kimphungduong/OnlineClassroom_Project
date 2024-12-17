const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // Người bình luận (có thể là học viên)
  createdAt: { type: Date, default: Date.now }
});

module.exports = commentSchema;
