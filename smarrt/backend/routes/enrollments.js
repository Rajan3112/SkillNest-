const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses, getAllEnrollments } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, enrollCourse);
router.get('/mycourses', protect, getMyCourses);
router.get('/all', protect, authorize('admin'), getAllEnrollments);

module.exports = router;
