const CourseService = require('../services/CourseService.js');

class CourseController{
    async getListCourse(req, res, next) {
        try {
        const courses = await CourseService.getListCourse();
        res.json(courses);
        } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    async getCourse(req, res, next) {
        try {
        const course = await CourseService.getCourse(req.params.slug);
        res.json(course);
        } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    async getLession(req, res, next) {
        try {
        const lession = await CourseService.getLession(req.params.slug, req.params.slugLesson);
        res.json(lession);
        } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    async getCoursesBySubject(req, res, next) {
        try {
            const courses = await CourseService.getCoursesBySubject(req.params.subjectSlug);
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    async searchCourses(req, res, next) {
        try {
            const { query } = req.query; // Lấy từ khóa tìm kiếm từ query string
            if (!query) {
                return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm' });
            }

            const courses = await CourseService.searchCourses(query); // Gọi hàm tìm kiếm trong CourseService
            res.json(courses); // Trả về danh sách khóa học
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

}
module.exports = new CourseController;