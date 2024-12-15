const mongoose = require('mongoose');

// Import các mô hình
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Notification = require('../models/notification');
const Subject = require('../models/subject');
const Course = require('../models/course');
const Payment = require('../models/payment');
const Lesson = require('../models/lesson');
const Document = require('../models/document');
const Note = require('../models/note');
const Test = require('../models/test');
const Submission = require('../models/submission');
const Review = require('../models/review');
const Comment = require('../models/comment');
const ForumPost = require('../models/forum_post');
const Message = require('../models/message');

// Hàm tạo dữ liệu seed
const seedData = async () => {
  try {
    // Xóa tất cả dữ liệu cũ
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Notification.deleteMany({});
    await Subject.deleteMany({});
    await Course.deleteMany({});
    await Payment.deleteMany({});
    await Lesson.deleteMany({});
    await Document.deleteMany({});
    await Note.deleteMany({});
    await Test.deleteMany({});
    await Submission.deleteMany({});
    await Review.deleteMany({});
    await Comment.deleteMany({});
    await ForumPost.deleteMany({});
    await Message.deleteMany({});

    // Seed dữ liệu Giáo viên
    const teacher1 = await Teacher.create({
      name: 'Nguyễn Văn A',
      gender: 'Nam',
      username: 'teacher1',
      password: 'password123',
      email: 'teacher1@example.com',
      phone: '0123456789',
      role: 'teacher'
    });

    const teacher2 = await Teacher.create({
      name: 'Trần Thị B',
      gender: 'Nữ',
      username: 'teacher2',
      password: 'password123',
      email: 'teacher2@example.com',
      phone: '0987654321',
      role: 'teacher'
    });

    // Seed dữ liệu Học viên
    const student1 = await Student.create({
      name: 'Lê Văn C',
      gender: 'Nam',
      username: 'student1',
      password: 'password123',
      email: 'student1@example.com',
      phone: '0912345678',
      role: 'student',
      notifications: [],
      registeredCourses: []
    });

    const student2 = await Student.create({
      name: 'Phạm Thị D',
      gender: 'Nữ',
      username: 'student2',
      password: 'password123',
      email: 'student2@example.com',
      phone: '0909876543',
      role: 'student',
      notifications: [],
      registeredCourses: []
    });

    // Seed dữ liệu Thông báo
    const notification1 = await Notification.create({
      content: 'Chào mừng bạn đến với hệ thống giáo dục.',
      createdAt: new Date()
    });

    const notification2 = await Notification.create({
      content: 'Khóa học mới vừa được mở!',
      createdAt: new Date()
    });

    // Thêm thông báo vào học viên
    student1.notifications.push(notification1._id);
    student2.notifications.push(notification2._id);
    await student1.save();
    await student2.save();

    // Seed dữ liệu Môn học
    const subject1 = await Subject.create({
      name: 'Toán học',
      description: 'Các khóa học về toán học cơ bản và nâng cao.'
    });

    const subject2 = await Subject.create({
      name: 'Vật lý',
      description: 'Khóa học liên quan đến vật lý lý thuyết và ứng dụng.'
    });

    // Seed dữ liệu Khóa học
    const course1 = await Course.create({
      name: 'Đại số tuyến tính',
      price: 1000000,
      rating: 4.5,
      teacher: teacher1._id,
      subject: subject1._id,
      updatedAt: new Date(),
      createdAt: new Date()
    });

    const course2 = await Course.create({
      name: 'Cơ học lượng tử',
      price: 2000000,
      rating: 5,
      teacher: teacher2._id,
      subject: subject2._id,
      updatedAt: new Date(),
      createdAt: new Date()
    });

    // Thêm khóa học vào giáo viên
    teacher1.courses.push(course1._id);
    teacher2.courses.push(course2._id);
    await teacher1.save();
    await teacher2.save();

    // Thêm khóa học vào học viên
    student1.registeredCourses.push(course1._id);
    student2.registeredCourses.push(course2._id);
    await student1.save();
    await student2.save();

    // Seed dữ liệu Thanh toán
    await Payment.create({
      course: course1._id,
      student: student1._id,
      method: 'VNPay',
      status: 'Thành công',
      amount: 1000000,
      transactionCode: 'PAY123456',
      purchasedAt: new Date()
    });

    await Payment.create({
      course: course2._id,
      student: student2._id,
      method: 'MoMo',
      status: 'Thành công',
      amount: 2000000,
      transactionCode: 'PAY654321',
      purchasedAt: new Date()
    });

    // Seed dữ liệu Bài giảng
    const lesson1 = await Lesson.create({
      name: 'Giới thiệu về Đại số tuyến tính',
      description: 'Video bài giảng về đại số tuyến tính.',
      videoUrl: 'https://example.com/video1',
      duration: 3600,
      course: course1._id,
      materials: ['https://example.com/material1.pdf'],
      notes: []
    });

    const lesson2 = await Lesson.create({
      name: 'Giới thiệu về Cơ học lượng tử',
      description: 'Video bài giảng về cơ học lượng tử.',
      videoUrl: 'https://example.com/video2',
      duration: 5400,
      course: course2._id,
      materials: ['https://example.com/material2.pdf'],
      notes: []
    });

    // Seed dữ liệu Tài liệu
    await Document.create({
        name: 'Tài liệu Đại số tuyến tính',
        url: 'https://example.com/document1.pdf',
        link: 'https://example.com/document1.pdf', // Thêm trường link
        lesson: lesson1._id,
        createdAt: new Date()
      });
  
      await Document.create({
        name: 'Tài liệu Cơ học lượng tử',
        url: 'https://example.com/document2.pdf',
        link: 'https://example.com/document2.pdf', // Thêm trường link
        lesson: lesson2._id,
        createdAt: new Date()
      });
    // Seed dữ liệu Ghi chú
    await Note.create({
      content: 'Ghi chú về Đại số tuyến tính',
      lesson: lesson1._id,
      student: student1._id,
      createdAt: new Date()
    });

    await Note.create({
      content: 'Ghi chú về Cơ học lượng tử',
      lesson: lesson2._id,
      student: student2._id,
      createdAt: new Date()
    });

    // Seed dữ liệu Bài kiểm tra
    const test1 = await Test.create({
      name: 'Kiểm tra Đại số tuyến tính',
      lesson: lesson1._id,
      questions: ['Câu hỏi 1', 'Câu hỏi 2', 'Câu hỏi 3'],
      createdAt: new Date()
    });

    const test2 = await Test.create({
      name: 'Kiểm tra Cơ học lượng tử',
      lesson: lesson2._id,
      questions: ['Câu hỏi 1', 'Câu hỏi 2', 'Câu hỏi 3'],
      createdAt: new Date()
    });

    // Seed dữ liệu Nộp bài
    await Submission.create({
      test: test1._id,
      student: student1._id,
      score: 90,
      timeSpent: 3600,
      submittedAt: new Date()
    });

    await Submission.create({
      test: test2._id,
      student: student2._id,
      score: 85,
      timeSpent: 5400,
      submittedAt: new Date()
    });

    // Seed dữ liệu Đánh giá
    await Review.create({
      course: course1._id,
      teacher: teacher1._id,
      student: student1._id,
      rating: 5,
      comment: 'Khóa học rất hay!',
      createdAt: new Date()
    });

    await Review.create({
      course: course2._id,
      teacher: teacher2._id,
      student: student2._id,
      rating: 4,
      comment: 'Khóa học tốt nhưng cần cải thiện tài liệu.',
      createdAt: new Date()
    });

    // Seed dữ liệu Bình luận
    const comment1 = await Comment.create({
      content: 'Bài giảng rất hay!',
      lesson: lesson1._id,
      user: student1._id,
      createdAt: new Date()
    });

    const comment2 = await Comment.create({
      content: 'Bài giảng cần thêm ví dụ.',
      lesson: lesson2._id,
      user: student2._id,
      createdAt: new Date()
    });

    // Seed dữ liệu Bài viết diễn đàn
    const forumPost1 = await ForumPost.create({
      title: 'Thảo luận về Đại số tuyến tính',
      content: 'Mọi người cùng thảo luận về Đại số tuyến tính nhé!',
      createdBy: teacher1._id,
      createdAt: new Date(),
      comments: [comment1._id]
    });

    const forumPost2 = await ForumPost.create({
      title: 'Thảo luận về Cơ học lượng tử',
      content: 'Mọi người cùng thảo luận về Cơ học lượng tử nhé!',
      createdBy: teacher2._id,
      createdAt: new Date(),
      comments: [comment2._id]
    });

    // Seed dữ liệu Tin nhắn
    await Message.create({
      sender: student1._id,
      receiver: student2._id,
      content: 'Chào bạn, bạn có thể giúp mình bài tập này không?',
      sentAt: new Date()
    });

    await Message.create({
      sender: student2._id,
      receiver: student1._id,
      content: 'Chào bạn, mình sẽ giúp bạn.',
      sentAt: new Date()
    });

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error while seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = seedData;