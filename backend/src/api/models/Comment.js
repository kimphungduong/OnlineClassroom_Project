const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // Người bình luận (có thể là học viên)
  createdAt: { type: Date, default: Date.now },
  votes: [
    {
      voteBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Người vote
      voteValue: { type: Number, enum: [1, -1], required: true }, // 1 (upvote) hoặc -1 (downvote)
    }
  ]
});

module.exports = mongoose.model('Comment', commentSchema);
