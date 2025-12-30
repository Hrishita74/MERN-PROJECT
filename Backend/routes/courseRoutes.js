const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// CREATE
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL (always array)
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(courses);
});

// READ BY ID
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.status(200).json(course ? [course] : []);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Course deleted' });
});

module.exports = router;
