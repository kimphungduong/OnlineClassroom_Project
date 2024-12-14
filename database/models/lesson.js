const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },  // Thời gian bài giảng (giây)
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  materials: [{ type: String }],  // Liên kết đến tài liệu học
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]  // Ghi chú liên quan
});

module.exports = mongoose.model('Lesson', lessonSchema);
