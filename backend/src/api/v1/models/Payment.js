const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  method: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionCode: { type: String, required: true, unique: true },
  purchasedAt: { type: Date, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
