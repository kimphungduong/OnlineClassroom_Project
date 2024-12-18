const Course = require('../models/Course');

// Lấy tất cả khóa học
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher').populate('students subjects lessons');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một khóa học theo ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher students subjects lessons');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo khóa học mới
exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật khóa học
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa khóa học (soft delete)
exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.delete({ _id: req.params.id });
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getCoursesByTeacher = async (req, res) => {
    const { teacherId } = req.query;
  
    if (!teacherId) {
      return res.status(400).json({ message: 'Teacher ID is required' });
    }
  
    try {
      // Tìm tất cả khóa học của giáo viên với teacherId
      const courses = await Course.find({ teacherId });
  
      if (courses.length === 0) {
        return res.status(404).json({ message: 'No courses found for this teacher' });
      }
  
      return res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};