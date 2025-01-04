const express = require('express');
const router = express.Router();

const courseController = require('../controllers/CourseController');

router.get('/', courseController.getListCourse);
router.get('/subject/:subjectSlug', courseController.getCoursesBySubject);
router.get('/search', courseController.searchCourses); // Thêm route tìm kiếm
router.get('/:slug', courseController.getCourse);
router.get('/:slug/:slugLesson', courseController.getLession);
router.get('/my-courses',courseController.getMyCourse);
router.get('/:slug/:lessonId/notes',courseController.getNotes);
router.get('/:slug/:id/learn',courseController.getLessionById);
router.post('/:lessonId/notes',courseController.addNote);

module.exports = router;
