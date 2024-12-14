const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
