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
}
module.exports = new CourseController;