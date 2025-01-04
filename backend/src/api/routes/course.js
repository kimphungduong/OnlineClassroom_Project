const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/CourseController');
const LessonRoutes = require('../routes/lesson');
const TestRoutes = require('../routes/test');


router.get('/', CourseController.getListCourse);
router.post('/new', CourseController.createCourse);
router.get('/course-info/:slug', CourseController.getCourseInfo);
router.put("/course-info/:courseSlug/edit", CourseController.updateCourse);

router.get('/:slug', CourseController.getCourse);
router.get('/:slug/lessons', CourseController.getLessonsByCourseSlug); // Corrected endpoint

// Cập nhật tiêu đề section
router.put('/:courseSlug/section/:sectionId', CourseController.updateSectionTitle);
router.post('/:courseSlug/section', CourseController.addSection);
router.delete('/:courseSlug/section/:sectionId', CourseController.deleteSection);

router.get('/:courseSlug/progress', CourseController.getStudentProgress);


router.use('/:courseSlug', LessonRoutes);
router.use('/:courseSlug', TestRoutes);

router.get('/my-courses',CourseController.getMyCourse);
router.get('/:slug',CourseController.getCourseWithLessons);
router.get('/:slug/:lessonId/notes',CourseController.getNotes);
router.get('/:slug/:slugLesson',CourseController.getLession);
router.get('/:slug/:id/learn',CourseController.getLessionById);
router.post('/:lessonId/notes',CourseController.addNote);


router.get('/subject/:subjectSlug', CourseController.getCoursesBySubject);
router.get('/', CourseController.getListCourse);
router.get('/search', CourseController.searchCourses); // Thêm route tìm kiếm
router.get('/:slug', CourseController.getCourse);
router.get('/:slug/:slugLesson', CourseController.getLession);
// route là đường dẫn. có 4 loại gọi api cơ bản là 
// POST nạp dataset mới (json)
// GET trả về dataset cần (json)
// PUT chinh sua dataset
// DELETE xoa du lieu

// đối với cái đầu tiên là sẽ lấy ra toàn bộ listcourse.
module.exports = router;
