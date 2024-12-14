const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  forumPost: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // Người bình luận (có thể là học viên)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
