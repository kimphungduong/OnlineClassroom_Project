const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/CourseController');

router.get('/', CourseController.getListCourse);
router.get('/:slug', CourseController.getCourse);
router.get('/:slug/lessons', CourseController.getLessonsByCourseSlug); // Corrected endpoint
// Thêm bài giảng vào section
router.post('/:slug/section/:sectionId/lesson/new', CourseController.addLessonToSection);

// Xóa bài giảng khỏi section
router.delete('/:slug/section/:sectionId/lesson/:lessonId', CourseController.removeLessonFromSection);

module.exports = router;