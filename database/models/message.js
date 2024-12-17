const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // Người gửi (có thể là học viên hoặc giáo viên)
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // Người nhận (có thể là học viên hoặc giáo viên)
  content: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
