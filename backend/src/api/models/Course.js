const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);


const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  sections: [{
    title: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.Mixed, refPath: 'lessonsType' }],
    lessonsType: { type: String, enum: ['Lesson', 'Test'] },
  }],
  updatedAt: { type: Date, default: null },
  slug: { type: String, slug: 'name', unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
  studentProgress: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    lessonsCompleted: [{
      lessons: {type: mongoose.Schema.Types.ObjectId, refPath: 'lessonType'},
      lessonType: {
        type: String,
        enum: ['Lesson', 'Test'],
        required: true
      },
    }],
  }],
},{
  timestamps: true,
});

courseSchema.plugin(mongooseDelete,{overrideMethods: 'all',deletedAt: true});

module.exports = mongoose.model('Course', courseSchema);