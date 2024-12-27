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
        const posts = await ForumPost.find({course: course._id});


        return posts
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

        const commentsPromises = post.comments.map(async commentId => {
            const comment = await Comment.findOne({ _id: commentId });
            return comment.toObject();
        });

        const commentRaw = await Promise.all(commentsPromises);

        const comments = commentRaw.map(async comment =>{
            const user = await Student.findOne({_id : comment.user})
            return {
                name : user.name,
                avatar : "https://via.placeholder.com/50",
                ...comment
            }
        })

        const commentF = await Promise.all(comments)

        return {
            voted : true,
            avatar: "https://via.placeholder.com/50",
            name,
            ...post.toObject(),
            comments : commentF.map(e=> {
                console.log(e)
                return {
                    ...e,
                    voteCount : e.votes.reduce((acc, curr) => acc + curr.voteValue, 0),
                    voted : e.votes.some(vote => vote.voteBy.toString() === userId)
                }

            })
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
        post.comments.push(comment._id)
        await post.save();

        const user = await Student.findOne({_id : userId})

        return {
            ...comment.toObject(),
            name : user.name,
            avatar : "https://via.placeholder.com/50",
        }
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports.addVote = async (slug, postId, userId, commentId, value) => {
    try
    {
        const courseId = await Course.findOne({ slug }).select('_id');

        if (!courseId) {
            throw new Error('Course không tồn tại.');
        }

        const comment = await Comment.findOne({
            _id : commentId
        })

        console.log("check")
        console.log(commentId)

        comment.votes.push({
            voteBy : userId,
            voteValue : value
        })

        await comment.save();

        return comment
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

