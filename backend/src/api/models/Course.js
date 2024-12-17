const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);


const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  updatedAt: { type: Date, default: null },
  slug: { type: String, slug: 'name', unique: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

courseSchema.plugin(mongooseDelete,{overrideMethods: 'all',deletedAt: true});

module.exports = mongoose.model('Course', courseSchema);
