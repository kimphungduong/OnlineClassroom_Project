const Test = require('../models/Test');
const Course = require('../models/Course');

class TestService {
  async createTest(courseSlug, sectionId, testData) {
    // Tìm khóa học theo slug
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) throw new Error('Course not found');

    // Tìm section trong khóa học
    const section = course.sections.id(sectionId);
    if (!section) throw new Error('Section not found in the course');

    // Tạo bài kiểm tra mới
    const test = new Test({
      ...testData, // Dữ liệu bài kiểm tra (title, questions, duration, ...)
      course: course._id, // Liên kết tới khóa học
    });
    await test.save();
    console.log(test);
    // Thêm bài kiểm tra vào section
    section.lessons.push({ lessonId: test._id, lessonType: 'Test' });
    await course.save();

    return test;
  }

  async deleteTest(courseSlug, sectionId, testId) {
    // Tìm khóa học
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) throw new Error('Course not found');

    // Tìm section trong khóa học
    const section = course.sections.id(sectionId);
    if (!section) throw new Error('Section not found in the course');

    // Tìm bài kiểm tra trong section
    const testIndex = section.lessons.findIndex(
      (lesson) => lesson.lessonId.toString() === testId && lesson.lessonType === 'Test'
    );
    if (testIndex === -1) throw new Error('Test not found in section');

    // Xóa bài kiểm tra khỏi section
    section.lessons.splice(testIndex, 1);

    // Xóa bài kiểm tra khỏi database
    await Test.findByIdAndDelete(testId);

    // Lưu thay đổi trong khóa học
    await course.save();

    return { message: 'Test deleted successfully' };
  }

  async getTestById(testId) {
    try {
      // Tìm Test theo ID và populate thông tin từ bảng Question
      const test = await Test.findById(testId)
        .populate({
          path: 'questions', // Tên trường cần populate
          model: 'Question', // Model của schema Question
          select: 'content answerOptions correctAnswer explanation', // Chọn các trường cần thiết
        });
  
      return test;
    } catch (error) {
      console.error('Error fetching test:', error);
      throw error;
    }
  }

  async updateTest(testId, updatedData) {
    return await Test.findByIdAndUpdate(testId, updatedData, { new: true });
  }

  async addSubmissionToTest (submissionData) {
    try {
      const test = await Test.findById(submissionData.test);

      if (!test) {
        throw new Error('Test not found');
      }
  
      test.submission.push(submissionData); // Thêm submission vào array
      return await test.save() ;
    } catch (error) {
      console.error('Error adding submission to test:', error);
    }
  };
}

module.exports = new TestService();
