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
    // Controller sẽ xử lí lỗi. và gọi hàm của service
    async getMyCourse(req, res, next) {
        try {
            const courses = await CourseService.getMyCourse(req.user.userId);
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
    async getLessionById(req, res, next) {
        try {
            const lession = await CourseService.getLessionById(req.params.slug, req.params.id);
        res.json(lession);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
    async getCourseWithLessons(req, res) {
        try {
            const { slug } = req.params;
            const courseData = await CourseService.getCourseWithLessons(slug);
            res.json(courseData);
        } catch (error) {
            if (error.message === 'Không tìm thấy khóa học') {
            return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi lấy thông tin khóa học', error });
        }
    }
    async getNotes(req, res) {
        try {
            const { lessonId } = req.params;
            const notes = await CourseService.getNoteByLessonId(lessonId, req.user.userId);
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi lấy ghi chú', error });
        }
    }
    async addNote(req, res) {
        try {
            const { lessonId } = req.params;
            const { content, time } = req.body;
            const note = await CourseService.addNote(lessonId, req.user.userId, content, time);
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thêm ghi chú', error });
        }
    }
    async updateNote(req, res) {
        try {
            const { noteId } = req.params;
            const { content } = req.body;
            const note = await CourseService.updateNote(noteId, content);
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi cập nhật ghi chú', error });
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