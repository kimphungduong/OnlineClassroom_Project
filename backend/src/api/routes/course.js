const express = require ('express');
const router =express.Router();

const courseController= require('../controllers/CourseController');

router.get('/',courseController.getListCourse);
router.get('/my-courses',courseController.getMyCourse);
router.get('/:slug',courseController.getCourseWithLessons);
router.get('/:slug/:lessonId/notes',courseController.getNotes);
router.get('/:slug/:slugLesson',courseController.getLession);
router.post('/:lessonId/notes',courseController.addNote);


module.exports = router;