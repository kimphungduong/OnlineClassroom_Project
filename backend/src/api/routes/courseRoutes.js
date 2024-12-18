const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursesController');

// Định nghĩa các routes
router.get('/', courseController.getCourses);             // Lấy tất cả khóa học
router.get('/:id', courseController.getCourseById);       // Lấy khóa học theo ID
router.post('/', courseController.createCourse);          // Tạo khóa học mới
router.put('/:id', courseController.updateCourse);        // Cập nhật khóa học
router.delete('/:id', courseController.deleteCourse);     // Xóa khóa học

module.exports = router;
