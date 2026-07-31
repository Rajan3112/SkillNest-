const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getFeaturedCourses } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getAllCourses);
router.get('/featured', getFeaturedCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorize('admin'), createCourse);
router.put('/:id', protect, authorize('admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
