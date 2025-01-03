const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  slug: { type: String, slug: 'name', required: true } // Added slug field as per the database
});

module.exports = mongoose.model('Subject', subjectSchema);
