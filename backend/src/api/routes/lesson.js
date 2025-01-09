const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams để nhận courseSlug từ CourseRoutes
const LessonController = require('../controllers/LessonController');

// Tạo bài giảng mới
router.post('/:sectionId/lesson', LessonController.createLesson);
router.delete('/:sectionId/lesson/:lessonId', LessonController.deleteLesson);

router.get('/lesson/:lessonId', LessonController.getLesson); // Lấy chi tiết bài học
router.put('/:lessonId', LessonController.updateLesson); // Cập nhật bài học
module.exports = router;