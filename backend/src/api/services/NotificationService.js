const Course = require("../models/Course");
const Notification = require("../models/Notification");
const ForumPost = require("../models/ForumPost");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Lesson = require("../models/Lesson");
const { sendCustomEvent } = require("../utils/sendCustomEvent");

const getLengthNotificationsUnRead = async (userId) => {
    try {
        const notification = await Notification.find( {
            userId : userId,
            is_read: false
        })
        return notification.length
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports.getLengthNotificationsUnRead = getLengthNotificationsUnRead

module.exports.getAll = async (userId) => {
    try {
        const notification = await Notification.find( {
            userId : userId
        })

        return notification
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports.addCommentForumNotification = async (courseId, userId, postId) => {
    try {
        const course = await Course.findOne({_id : courseId})
        if (!course) {
            throw new Error("Course does not exist");
        }
        const post = await ForumPost.findOne({
            course: courseId,
            _id: postId
        })

        if(post.createdBy.toString() === userId.toString()) {
            return;
        }

        const result = await Student.findOne({ _id: userId  })
            ?? await Teacher.findOne({ _id: userId });
        const { name } = result || {};

        await Notification.create({
            userId : userId,
            type: "commentForum",
            title : `**${name}** đã bình luận trong bài viết **${post.title}** của bạn trong khóa học **${course.name}**`,
            content : `${name} đã bình luận trong bài viết ${post.title} của bạn trong khóa học ${course.name}`,
            related_data : {
                course_slug : course.slug,
                post_id : postId
            }
        });
        const len = await  getLengthNotificationsUnRead(userId)
        sendCustomEvent(userId, "lenNotification", len)
    }
    catch (e) {
        console.error(e)
    }
}

module.exports.addPostForumNotification = async (courseId, userId) => {
    try {
        const course = await Course.findOne({_id : courseId})
        if (!course) {
            throw new Error("Course does not exist");
        }
        
        if(course.teacher.toString() === userId.toString()) {
            return;
        }

        const result = await Student.findOne({ _id: userId  })
            ?? await Teacher.findOne({ _id: userId });
        
        const { name } = result || {};

        await Notification.create({
            userId : course.teacher,
            type: "postForum",
            title : `**${name}** đã thêm bài viết mới trong khóa học **${course.name}** của bạn`,
            content : `${name} đã thêm bài viết mới trong khóa học ${course.name} của bạn`,
            related_data : {
                course_slug : course.slug,
            }
        });

        const len = await  getLengthNotificationsUnRead(userId)
        sendCustomEvent(userId, "lenNotification", len)

    }
    catch (e) {
        console.error(e)
    }
}

module.exports.addLessonForCourse = async (course, lessonSlug, lessonData) => {
    try {
        course.students.forEach(async (student) => {
            await Notification.create({
                userId: student,
                type: "new_lesson",
                title: `Giảng viên đã thêm bài học mới " **${lessonData.name}** " trong khóa học **${course.name}**`,
                content: `Giảng viên đã thêm bài học **${lessonData.name}** trong khóa học **${course.name}**`,
                related_data: {
                    course_slug: course.slug,
                    lesson_slug: lessonSlug
                }
            });
            const len = await getLengthNotificationsUnRead(student)
            sendCustomEvent(student, "lenNotification", len)
        })
    }
    catch (e) {
        console.error(e)
    }
}

module.exports.addTestForCourse = async (course, testName, testId) => {
    try {
        course.students.forEach(async (student) => {
            await Notification.create({
                userId: student,
                type: "new_test",
                title: `Giảng viên đã thêm bài kiểm tra mới " **${testName}** " trong khóa học **${course.name}**, click vào đây để làm bài kiểm tra`,
                content: `Giảng viên đã thêm bài kiểm tra **${testName}** trong khóa học **${course.name}**`,
                related_data: {
                    course_slug: course.slug,
                    test_id: testId.toString()
                }
            });
            const len = await getLengthNotificationsUnRead(student)
            sendCustomEvent(student, "lenNotification", len)
        })
    }
    catch (e) {
        console.error(e)
    }
}

module.exports.paymentSuccessNotification = async (studentId, course) => {
    try {
        await Notification.create({
            userId: studentId,
            type: "payment_success",
            title: `Thanh toán thành công khóa học " **${course.name}** " vào học thôi nào.`,
            content: `Thanh toán thành công khóa học " **${course.name}** " vào học thôi nào.`
        });
        const len = await getLengthNotificationsUnRead(studentId)
        sendCustomEvent(studentId, "lenNotification", len)
    }
    catch (e) {
        console.error(e)
    }
}



module.exports.setRead = async (userId, notificationId) => {
    try {
        const noti = await Notification.findOne({ _id : notificationId})
        noti.is_read = true;
        await noti.save();
        const len = await  getLengthNotificationsUnRead(userId)
        sendCustomEvent(userId, "lenNotification", len)
    }
    catch (e) {
        console.error(e)
    }
}