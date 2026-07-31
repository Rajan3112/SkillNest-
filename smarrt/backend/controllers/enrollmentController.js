const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({ user: userId, course: courseId });

    await Course.findByIdAndUpdate(courseId, { $inc: { studentsEnrolled: 1 } });

    const populatedEnrollment = await Enrollment.findById(enrollment._id).populate('course');

    res.status(201).json({ success: true, message: 'Enrolled successfully', enrollment: populatedEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('course').sort({ createdAt: -1 });
    res.json({ success: true, count: enrollments.length, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('user').populate('course').sort({ createdAt: -1 });
    res.json({ success: true, count: enrollments.length, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
