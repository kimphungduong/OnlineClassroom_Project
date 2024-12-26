const Course = require("../models/Course");
const ForumPost = require("../models/ForumPost");
const Student = require("../models/Student");
const Comment = require("../models/Comment");

module.exports.addPost = async(title, content, userId, slug) => {
    try {
        const courseId = await Course.findOne({ slug: slug }).select('_id');
        const newPost = new ForumPost({
            title,
            content,
            createdBy : userId,
            course : courseId,
            comments : [],
            votes: []
        })

        return await newPost.save();

    } catch (error) {
        console.error( "Lỗi khi thêm bài viết: "+ error);
    }
}

module.exports.getAllPosts = async (slug) => {
    try {
        // Tìm courseId dựa trên slug
        const course = await Course.findOne({ slug }).select('_id');

        if (!course) {
            throw new Error('Course không tồn tại.');
        }

        return await ForumPost.find({course: course._id});
    } catch (error) {
        console.error("Lỗi lấy bài viết: " + error.message);
        throw error;
    }
};

module.exports.getPost = async (slug, postId, userId) =>{
    try {
        const courseId = await Course.findOne({ slug }).select('_id');

        if (!courseId) {
            throw new Error('Course không tồn tại.');
        }

        const post = await ForumPost.findOne({
            course: courseId,
            _id: postId
        })

        const {name} = await Student.findOne({
            _id :userId
        })


        return {
            voted : true,
            avatar: "https://via.placeholder.com/50",
            name,
            ...post.toObject()
        }
    }
    catch (error) {
        throw error;
    }
}

module.exports.addComment = async(slug, postId, userId, content) =>{
    try {

        const courseId = await Course.findOne({ slug }).select('_id');

        if (!courseId) {
            throw new Error('Course không tồn tại.');
        }

        const post = await ForumPost.findOne({
            course: courseId,
            _id: postId
        })

        const comment = await Comment.create({content : content, user : userId})
        console.log("tu")
        post.comments.push(comment)

        await post.save();



        return comment
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

