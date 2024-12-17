const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
