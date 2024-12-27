const Course = require('../models/Course'); // Điều chỉnh đường dẫn nếu cần
const Lesson = require('../models/Lesson');
const Test = require('../models/Test');

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
      const course = await Course.findOne({ slug }).lean();
  
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
  
      // Duyệt qua các sections và populate từng bài giảng
      for (const section of course.sections) {
        const populatedLessons = await Promise.all(
          section.lessons.map(async (lesson) => {
            let populatedLesson = null;
            if (lesson.lessonType === 'Lesson') {
              populatedLesson = await Lesson.findById(lesson.lessonId)
                .select('name description videoUrl slug')
                .populate("course", "name")
                .lean();
            } else if (lesson.lessonType === 'Test') {
              populatedLesson = await Test.findById(lesson.lessonId)
                .select('name questions')
                .lean();
            }
  
            if (populatedLesson) {
              return {
                ...populatedLesson,
                lessonType: lesson.lessonType, // Thêm lessonType từ dữ liệu gốc
              };
            }
            return null; // Loại bỏ các bài giảng không hợp lệ
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

  // PUT
  async updateSectionTitle(courseSlug, sectionId, title) {
    if (!title) {
      throw new Error('Tiêu đề không được để trống');
    }
  
    const course = await Course.findOneAndUpdate(
      { slug: courseSlug, 'sections._id': sectionId },
      { $set: { 'sections.$.title': title } },
      { new: true }
    );
  
    if (!course) {
      throw new Error('Khóa học hoặc phần không tồn tại');
    }
  
    return course.sections;
  };

  async addSection(courseSlug, title) {
    if (!title) {
      throw new Error('Tiêu đề không được để trống');
    }
  
    const course = await Course.findOneAndUpdate(
      { slug: courseSlug },
      { $push: { sections: { title, lessons: [] } } },
      { new: true }
    );
  
    if (!course) {
      throw new Error('Khóa học không tồn tại');
    }
  
    return course.sections;
  };

  async deleteSection(courseSlug, sectionId) {
    const course = await Course.findOneAndUpdate(
      { slug: courseSlug },
      { $pull: { sections: { _id: sectionId } } },
      { new: true }
    );
  
    if (!course) {
      throw new Error('Khóa học hoặc phần không tồn tại');
    }
  
    return course.sections;
  };



}


module.exports = new CourseService();
