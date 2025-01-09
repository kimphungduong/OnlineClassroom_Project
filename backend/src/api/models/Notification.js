const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId : {type : String, required : true},
  type: { type: String, required: true, enum: ["commentForum","comment", "new_test", "new_lesson", "message", "other", "postForum", "payment_success"]},
  title: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  related_data: {
    course_slug: {
      type: String,
      ref: "Course",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Tham chiếu tới bảng Posts (nếu có)
    },
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Tham chiếu tới bảng Comments (nếu có)
    },
    lesson_slug: {
      type: String,
      ref: "Lesson", // Tham chiếu tới bảng Lessons (nếu có)
    },
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test", // Tham chiếu tới bảng Tests (nếu có)
    },
  },
  is_read: {
    type: Boolean,
    default: false, // Mặc định là chưa đọc
  },
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
