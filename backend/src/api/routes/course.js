const express = require('express');
const router = express.Router();

const courseController = require('../controllers/CourseController');

router.get('/subject/:subjectSlug', courseController.getCoursesBySubject);
router.get('/', courseController.getListCourse);
router.get('/search', courseController.searchCourses); // Thêm route tìm kiếm
router.get('/:slug', courseController.getCourse);
router.get('/:slug/:slugLesson', courseController.getLession);

module.exports = router;
