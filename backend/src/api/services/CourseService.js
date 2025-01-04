const Course = require('../models/Course'); // Điều chỉnh đường dẫn nếu cần
const Lesson = require('../models/Lesson');
const Teacher = require('../models/Teacher');
const Test = require('../models/Test');
const Student = require('../models/Student');
const Note = require('../models/Note');

class CourseService {

  async createCourse(courseData) {
    try {
      const course = new Course(courseData);

      await course.save();

      return course;
    } catch (error) {
      // Nếu có lỗi trong quá trình lưu, ném lỗi
      throw new Error('Không thể tạo khóa học: ' + error.message);
    }
  }
  async updateCourse(courseSlug, courseData) {
    try {
      // Tìm và cập nhật thông tin khóa học dựa vào slug
      const updatedCourse = await Course.findOneAndUpdate(
        { slug: courseSlug }, // Điều kiện tìm kiếm
        courseData,           // Dữ liệu cập nhật
        { new: true }         // Tùy chọn để trả về dữ liệu đã cập nhật
      );

      return updatedCourse; // Trả về khóa học đã cập nhật (hoặc null nếu không tìm thấy)
    } catch (error) {
      console.error("Error in updateCourse service:", error);
      throw new Error("Database update failed");
    }
  }
  async getListCourse() {
    try {
      const courses = await Course.find({});
      return courses;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách khóa học');
    }
  }
  // lấy danh sách Course là model ánh xạ vo database. Coures.find() trả về tất cả khoá học. sevice sẽ định nghĩa các hàm làm gì
  async getCourse(slug) {
    try {
      const course = await Course.findOne({ slug })
          .populate('teacher')
          .populate('sections.lessons');
        if (!course) return res.status(404).json({ message: 'Không tìm thấy khóa học' });
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      return course;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin khóa học');
    }
  }
  async getCourseInfo(slug) {
    try {
      const course = await Course.findOne({ slug }).select('name subject image description price ');
        if (!course) return res.status(404).json({ message: 'Không tìm thấy khóa học' });
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      return course;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin khóa học');
    }
  }
  async getCourseWithLessons (slug) {
    const course = await Course.findOne({ slug })
      .populate('teacher', 'name email -_id')
      .populate('students', 'name')
      .lean();
  
    if (!course) {
      throw new Error('Không tìm thấy khóa học');
    }
  
    const lessons = await Promise.all(
      course.sections.map(async (section) => {
        return await Promise.all(
          section.lessons.map(async (lesson) => {
            if (lesson.lessonType === 'Lesson') {
              return await Lesson.findById(lesson.lessonId);
            } else if (lesson.lessonType === 'Test') {
              return await Test.findById(lesson.lessonId);
            }
          })
        );
      })
    );

    course.sections = course.sections.map((section, index) => ({
      ...section,
      lessons: lessons[index]
    }));

    return course;
  }
  async getMyCourse(userId) {
    try {
      const courses = await Course.find({ students: userId })
      .select('-teacher -students -price -rating -updatedAt -createdAt -__v')  
      .populate({
          path: 'studentProgress',
          match: { student: userId },
          populate: {
            path: 'lessonsCompleted',
            select: 'title'
          }
        })
        .lean();
  
      // Tính toán tiến độ học tập
      const coursesWithProgress = courses.map(course => {
        const studentProgress = course.studentProgress.find(progress => progress.student.toString() === userId);
        const totalLessons = course.sections.reduce((total, section) => total + section.lessons.length, 0);
        const completedLessons = studentProgress ? studentProgress.lessonsCompleted.length : 0;
        const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
        return {
          ...course,
          progress
        };
      });
  
      return coursesWithProgress;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách khóa học');
    }
  }
  async getLession(slug, slugLesson) {
    try {
      const course = await Course.findOne({ slug }).lean();
  
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      const lesson = await Lesson.findOne({ slug: slugLesson, course: course._id });
      // lấy danh sách bài giảng

      if (!lesson) {
        throw new Error('Bài học không tồn tại');
      }
  
      return course.sections; // Trả về danh sách sections với lessons đã populate
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin bài học: ' + error.message);
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



  async getStudentProgress(slug) {
    // Lấy thông tin course cùng với studentProgress và thông tin student
    const course = await Course.findOne({ slug })
      .populate({
        path: 'studentProgress.student',
        select: 'name email', // Chỉ lấy name và email từ Student
      })
      .populate('students')
      .lean(); // Sử dụng lean() để tối ưu hóa query
    if (!course) {
      throw new Error('Course not found');
    }
    const totalLessons = course.sections.reduce((sum, section) => sum + section.lessons.length, 0);

    // Lấy danh sách tất cả học sinh liên kết với khóa học
    const allStudents = course.students.map(student => ({
      studentId: student._id.toString(),
      name: student.name,
      email: student.email,
      lessonsCompleted: 0,

    }));
  
    // Map thông tin studentProgress
    const progressMap = course.studentProgress.reduce((acc, progress) => {
      const lessonsCompleted = progress.lessonsCompleted.length; // Đếm tổng số lessonsCompleted
      
      acc[progress.student._id.toString()] = {
        lessonsCompleted,
      };
      return acc;
    }, {});
  
    // Kết hợp dữ liệu progress vào danh sách học sinh
    const result = allStudents.map(student => ({
      name: student.name,
      email: student.email,
      lessonsCompleted: progressMap[student.studentId]?.lessonsCompleted || 0,
      totalLessons: totalLessons,
    }));
  
    return result;
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



  async getLession(slug, lessionId) {
    try {
      const course = await Course.findOne({ slug });
      if (!course) {
        throw new Error('Khóa học không tồn tại');
      }
      const lesson = await Lesson.findOne({ _id: lessionId, course: course._id });
      // lấy danh sách bài giảng

      if (!lesson) {
        throw new Error('Bài học không tồn tại');
      }
      return lesson;
    }catch (error) {
      throw new Error('Lỗi khi lấy thông tin bài học');
    }
  }
  async getNoteByLessonId(lessonId, userId) {
    try {
      const notes = await Note.find({ lesson: lessonId, student: userId }).lean();
      if (!notes) {
        throw new Error('Không tìm thấy ghi chú');
      }
      return notes;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin ghi chú');
    }
  }
  async addNote (lessonId, studentId, content, time) {
    try {
      const newNote = await Note.create({ lesson: lessonId, student: studentId, content, time });
      return newNote;
    } catch (error) {
      throw new Error('Lỗi khi thêm ghi chú');
    }
  }
  
}


module.exports = new CourseService();
