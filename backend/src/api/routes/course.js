const express = require ('express');
const router =express.Router();

const courseController= require('../controllers/CourseController');

router.get('/',courseController.getListCourse);
router.get('/:slug',courseController.getCourse);
router.get('/:slug/:slugLesson',courseController.getLession);


module.exports = router;