// CourseService.js
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Teacher = require('../models/Teacher'); 
const Subject = require('../models/Subject'); 



class CourseService {
    async getListCourse() {
        try {
            const courses = await Course.find({}).populate('teacher'); // Lấy đầy đủ thông tin giáo viên
            return courses;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách khóa học');
        }
    }

    async getCourse(slug) {
        try {
            const course = await Course.findOne({ slug }).populate('teacher'); // Lấy đầy đủ thông tin giáo viên
            if (!course) {
                throw new Error('Khóa học không tồn tại');
            }
            return course;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin khóa học');
        }
    }

    async getLession(slug, slugLesson) {
        try {
            const course = await Course.findOne({ slug }); // Lấy đầy đủ thông tin giáo viên nếu cần
            if (!course) {
                throw new Error('Khóa học không tồn tại');
            }
            const lesson = await Lesson.findOne({ slug: slugLesson, course: course._id });
            if (!lesson) {
                throw new Error('Bài học không tồn tại');
            }
            return lesson;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin bài học');
        }
    }

    async getCoursesBySubject(subjectSlug) {
        try {
            console.log('Tìm kiếm môn học với slug:', subjectSlug);
            const subject = await Subject.findOne({ slug: subjectSlug });
            if (!subject) {
                throw new Error('Môn học không tồn tại');
            }

            console.log('Tìm khóa học thuộc môn học:', subject._id);
            const courses = await Course.find({ subjects: subject._id }).populate('teacher');
            return courses;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khóa học theo môn học:', error);
            throw new Error('Lỗi khi lấy danh sách khóa học theo môn học');
        }
    }

    async searchCourses(keyword) {
        try {
            // Tìm kiếm khóa học dựa trên tiêu đề (title)
            const courses = await Course.find({
                name: { $regex: keyword, $options: 'i' } // Sử dụng regex để tìm kiếm không phân biệt hoa thường
            }).populate('teacher');
            return courses;
        } catch (error) {
            console.error('Lỗi khi tìm kiếm khóa học:', error);
            throw new Error('Lỗi khi tìm kiếm khóa học');
        }
    }

}

module.exports = new CourseService();
