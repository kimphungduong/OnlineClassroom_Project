const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const UploadService = require('./UploadService');
const { addLessonForCourse } = require("./NotificationService")
class LessonService {
  async createLesson(courseSlug, sectionId, lessonData) {
    // Tìm course dựa trên slug
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) throw new Error('Course not found');

    // Tìm section trong course
    const section = course.sections.id(sectionId);
    if (!section) throw new Error('Section not found in the course');

    // Tạo lesson
    const lesson = new Lesson({
      ...lessonData, // Dữ liệu bài giảng (name, description, ...)
      course: course._id, // Liên kết tới khóa học
    });
    await lesson.save();

    addLessonForCourse(course, lesson.slug, lessonData)

    // Thêm bài giảng vào danh sách bài giảng của section
    section.lessons.push({ lessonId: lesson._id, lessonType: 'Lesson' });
    await course.save();

    return lesson;
  }
  async deleteLesson(courseSlug, sectionId, lessonId) {
    // Tìm khóa học
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      throw new Error('Course not found');
    }

    // Tìm section trong khóa học
    const section = course.sections.id(sectionId);
    if (!section) {
      throw new Error('Section not found in the course');
    }

    // Tìm bài học trong section
    const lessonIndex = section.lessons.findIndex(
      (lesson) => lesson.lessonId.toString() === lessonId
    );
    if (lessonIndex === -1) {
      throw new Error('Lesson not found in section');
    }

    // Lấy bài học từ database
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Xóa tài liệu liên quan
    const deleteDocumentsPromises = lesson.document.map((doc) =>
      UploadService.deleteFile(doc.link) // Xóa từng tài liệu bằng UploadService
    );
    await Promise.all(deleteDocumentsPromises);

    // Xóa bài học khỏi section
    section.lessons.splice(lessonIndex, 1);

    // Xóa bài học khỏi database
    await lesson.deleteOne();

    // Lưu lại thay đổi trong khóa học
    await course.save();

    return { message: 'Lesson and documents deleted successfully' };
  }

  async getLessonById(lessonId) {
    return await Lesson.findById(lessonId);
  }
  async updateLesson(lessonId, updatedData) {
    // const updatePayload = {
    //   ...updatedData,
    //   ...(files?.video && { videoUrl: files.video.path }),
    //   ...(files?.documents && {
    //     document: files.documents.map((file) => ({
    //       name: file.originalname,
    //       link: file.path,
    //     })),
    //   }),
    // };

    return await Lesson.findByIdAndUpdate(lessonId, updatedData, { new: true });
  }
}

module.exports = new LessonService();
