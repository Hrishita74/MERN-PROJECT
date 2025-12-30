const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
