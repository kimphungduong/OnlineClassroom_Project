const Course = require('../models/Course'); // Điều chỉnh đường dẫn nếu cần
const Lesson = require('../models/Lesson');

class CourseService {
  async getListCourse() {
    try {
      const courses = await Course.find({});
      return courses;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách khóa học');
    }
  }

  async getCourse(slug) {
    try {
      const course = await Course.findOne({ slug })
        .populate({
          path: 'sections.lessons.lessonId',
          model: Lesson,
        }); // Populate thông tin bài giảng
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      return course;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin khóa học');
    }
  }


  async getLessonsByCourseSlug(slug) {
    try {
      const course = await Course.findOne({ slug }).lean(); // Sử dụng lean để tối ưu hóa

      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }

      // Duyệt qua các sections và populate từng bài giảng
      for (const section of course.sections) {
        const populatedLessons = await Promise.all(
          section.lessons.map(async (lesson) => {
            if (lesson.lessonType === 'Lesson') {
              return await Lesson.findById(lesson.lessonId).select('name description videoUrl slug').populate("course", "name").lean();
            }
            return null; // Hoặc xử lý các bài giảng khác (ví dụ Test) nếu cần
          })
        );

        // Gán kết quả populate lại cho lessons
        section.lessons = populatedLessons.filter(Boolean); // Loại bỏ các bài giảng null
      }

      return course.sections; // Trả về danh sách sections với lessons đã populate
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin bài học: ' + error.message);
    }
  }
  // Thêm bài giảng vào một section
  async addLessonToSection(courseSlug, sectionId, lessonData) {
    try {
      // 1. Kiểm tra khóa học
      const course = await Course.findOne({ slug: courseSlug });
      if (!course) throw new Error('Không tìm thấy khóa học');

      // 2. Kiểm tra section
      const section = course.sections.find((sec) => sec._id.toString() === sectionId);
      if (!section) throw new Error('Không tìm thấy section');

      // 3. Tạo bài giảng mới trong Lesson
      const newLesson = await Lesson.create(lessonData);

      // 4. Thêm bài giảng mới vào danh sách bài giảng của section
      section.lessons.push({
        lessonId: newLesson._id,
        lessonType: "Lesson",
      });

      // 5. Lưu cập nhật vào Course
      await course.save();

      return newLesson;
    } catch (error) {
      throw new Error(`Lỗi khi thêm bài giảng: ${error.message}`);
    }
  }

  async removeLessonFromSection(courseSlug, sectionId, lessonId) {
    try {
      // 1. Kiểm tra khóa học
      const course = await Course.findOne({ slug: courseSlug });
      if (!course) throw new Error('Không tìm thấy khóa học');

      // 2. Kiểm tra section
      const section = course.sections.find((sec) => sec._id.toString() === sectionId);
      if (!section) throw new Error('Không tìm thấy section');

      // 3. Xóa bài giảng khỏi collection Lesson
      const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
      if (!deletedLesson) throw new Error('Không tìm thấy bài giảng để xóa');

      // 4. Loại bỏ bài giảng khỏi danh sách lessons của section
      section.lessons = section.lessons.filter((lesson) => lesson.lessonId.toString() !== lessonId);

      // 5. Lưu thay đổi vào khóa học
      await course.save();

      return deletedLesson; // Trả về bài giảng đã xóa
    } catch (error) {
      throw new Error(`Lỗi khi xóa bài giảng: ${error.message}`);
    }
  }
}


module.exports = new CourseService();
