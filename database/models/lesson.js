const mongoose = require('mongoose');
const documentSchema = require('./document');


const lessonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },  // Thời gian bài giảng (giây)
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  document: [documentSchema],  // Liên kết đến tài liệu học
  forumPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost'}],  // Bài viết diễn đàn liên quan
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]  // Ghi chú liên quan
});

module.exports = mongoose.model('Lesson', lessonSchema);
