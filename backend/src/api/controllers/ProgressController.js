// const Course = require('../models/Course');
// const Test = require('../models/Test');

// exports.getProgressByCourse = async (req, res) => {
//   try {
//     const { courseId } = req.params;

//     // 1. Lấy danh sách bài giảng (Lessons) từ khóa học
//     const course = await Course.findById(courseId).populate('lessons');
//     if (!course) {
//       return res.status(404).json({ message: 'Không tìm thấy khóa học' });
//     }

//     // 2. Lấy tất cả các bài kiểm tra (Tests) liên quan đến các bài giảng
//     const lessonIds = course.lessons.map(lesson => lesson._id);
//     const tests = await Test.find({ lesson: { $in: lessonIds } }).populate({
//       path: 'submission',
//       populate: { path: 'student', select: 'name' } // Populate student để lấy tên học viên
//     });

//     // 3. Tính tiến độ học tập cho từng học viên
//     const progressMap = {};

//     tests.forEach(test => {
//       test.submission.forEach(submission => {
//         const studentId = submission.student._id.toString();

//         if (!progressMap[studentId]) {
//           progressMap[studentId] = {
//             name: submission.student.name,
//             submissions: 0,
//           };
//         }
//         progressMap[studentId].submissions += 1;
//       });
//     });

//     // 4. Tạo kết quả
//     const result = Object.keys(progressMap).map(studentId => ({
//       name: progressMap[studentId].name,
//       submissions: progressMap[studentId].submissions,
//       totalTests: tests.length,
//     }));

//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error calculating progress:', error);
//     res.status(500).json({ message: 'Lỗi khi tính tiến độ học tập', error });
//   }
// };
