const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true }, // Tạo slug từ name
});

module.exports = mongoose.model('Subject', subjectSchema);
