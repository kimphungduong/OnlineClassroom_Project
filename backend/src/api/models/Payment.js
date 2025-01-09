const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }],
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  method: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  amount: { type: Number, required: true },
  description: { type: String, unique: true }
},{
  timestamps: true
});

paymentSchema.pre('save', function(next) {
  if (this.isNew) {
      const timestamp = Date.now();
      this.description = `PAY-${this._id}-${timestamp}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
