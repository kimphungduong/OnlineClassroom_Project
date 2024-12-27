const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/CourseController');
const LessonRoutes = require('../routes/lesson');

router.get('/', CourseController.getListCourse);
router.get('/:slug', CourseController.getCourse);
router.get('/:slug/lessons', CourseController.getLessonsByCourseSlug); // Corrected endpoint

// Cập nhật tiêu đề section
router.put('/:courseSlug/section/:sectionId', CourseController.updateSectionTitle);
router.post('/:courseSlug/section', CourseController.addSection);
router.delete('/:courseSlug/section/:sectionId', CourseController.deleteSection);



router.use('/:courseSlug', LessonRoutes);

module.exports = router;