const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams để nhận courseSlug từ CourseRoutes
const TestController = require('../controllers/TestController');

// Tạo bài kiểm tra mới
router.post('/:sectionId/test', TestController.createTest);

// Xóa bài kiểm tra
router.delete('/:sectionId/test/:testId', TestController.deleteTest);

// Lấy chi tiết bài kiểm tra
router.get('/test/:testId', TestController.getTest);

// Cập nhật bài kiểm tra
router.put('/test/:testId', TestController.updateTest);

router.put('/test/:testId/submission', TestController.addSubmission);

module.exports = router;
