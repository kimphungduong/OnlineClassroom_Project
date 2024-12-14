const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },  // Giáo viên hoặc học viên tạo bài viết
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]  // Bình luận của bài viết
});

module.exports = mongoose.model('ForumPost', forumPostSchema);
