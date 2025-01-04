const express = require("express");
const TeacherController = require("../controllers/TeacherController");

const router = express.Router();


// Route: Lấy thông tin giáo viên theo ID
router.get("/:id", TeacherController.getTeacherById);

// Route: Cập nhật thông tin giáo viên
router.put("/:id", TeacherController.updateCourseTeacher);


module.exports = router;
