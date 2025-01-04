const Course = require("../models/Course");
const Notification = require("../models/Notification");
const ForumPost = require("../models/ForumPost");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
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