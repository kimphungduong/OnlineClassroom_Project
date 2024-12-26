const express = require ('express');
const router =express.Router();

const courseController= require('../controllers/CourseController');
const { addPost, getAllPosts, getPost, addComment}= require('../controllers/ForumPostController');

router.get('/',courseController.getListCourse);
router.get('/my-courses',courseController.getMyCourse);
router.get('/:slug',courseController.getCourseWithLessons);

router.get('/:slug/forum', getAllPosts);
router.post('/:slug/forum/add-post', addPost);
router.get('/:slug/forum/:postId', getPost)
router.post('/:slug/forum/:postId/add-comment', addComment)

router.get('/:slug/:lessonId/notes',courseController.getNotes);
router.get('/:slug/:slugLesson',courseController.getLession);
router.post('/:lessonId/notes',courseController.addNote);


// route là đường dẫn. có 4 loại gọi api cơ bản là 
// POST nạp dataset mới (json)
// GET trả về dataset cần (json)
// PUT chinh sua dataset
// DELETE xoa du lieu

// đối với cái đầu tiên là sẽ lấy ra toàn bộ listcourse.
module.exports = router;