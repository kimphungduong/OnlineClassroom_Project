const mongoose = require('mongoose');
const Comment = require('./comment');

const forumPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },  // Giáo viên hoặc học viên tạo bài viết
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },  // Khóa học của bài vi
  createdAt: { type: Date, default: Date.now },
  comments: [Comment]  // Bình luận của bài viết
});

module.exports = mongoose.model('ForumPost', forumPostSchema);
