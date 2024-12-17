const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  link: { type: String, required: true, unique: true },  // Link tài liệu
  createdAt: { type: Date, default: Date.now }
});

module.exports = documentSchema;
