const Course = require("../models/Course");
const ForumPost = require("../models/ForumPost");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Comment = require("../models/Comment");
const {
    addCommentForumNotification,
    addPostForumNotification
} = require("./NotificationService")

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

        addPostForumNotification(courseId, userId)

        return await newPost.save();

    } catch (error) {
        console.error( "Lỗi khi thêm bài viết: "+ error);
    }
}

module.exports.getAllPosts = async (slug) => {
    try {
        // Tìm courseId dựa trên slug
        const course = await Course.findOne({ slug })

        const courseId = course._id;

        if (!course) {
            throw new Error('Course không tồn tại.');
        }
        const posts = await ForumPost.find({course: courseId});

        const postsFull = posts.map(async post => {
            const result = await Student.findOne({ _id: post.createdBy })
                ?? await Teacher.findOne({ _id: post.createdBy });
            const { name, avatar } = result || {};

            return {
                ...post.toObject(),
                name,
                avatar : avatar,
                voteCount: post.votes.reduce((acc, curr) => acc + curr.voteValue, 0),
                commentCount : post.comments.length
            }
        })
        const result = await Promise.all(postsFull)
        return {
            posts : result,
            courseName : course.name
        }
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

        const result = await Student.findOne({ _id: userId  })
            ?? await Teacher.findOne({ _id: userId });
        const { name, avatar } = result || {};

        const commentsPromises = post.comments.map(async commentId => {
            const comment = await Comment.findOne({ _id: commentId });
            return comment.toObject();
        });

        const commentsV = await Promise.all(commentsPromises);

        const sortedComments = commentsV.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const comments = sortedComments.map(async comment =>{
            const result = await Student.findOne({ _id: comment.user  })
                ?? await Teacher.findOne({ _id: comment.user });
            const { name, avatar } = result || {};

            return {
                name : name,
                avatar : avatar,
                ...comment
            }
        })

        const commentF = await Promise.all(comments)

        return {
            avatar: avatar,
            name,
            ...post.toObject(),
            voteCount : post.votes.reduce((acc, curr) => acc + curr.voteValue, 0),
            voted : post.votes.some(vote => vote.voteBy.toString() === userId),
            comments : commentF.map(e=> {
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

        const result = await Student.findOne({ _id: userId  })
            ?? await Teacher.findOne({ _id: userId });
        const { name, avatar } = result || {};

        addCommentForumNotification(courseId, userId, postId)

        return {
            ...comment.toObject(),
            name : name,
            avatar : avatar,
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

module.exports.addVotePost = async (slug, postId, userId, value) => {
    try
    {
        const courseId = await Course.findOne({ slug }).select('_id');

        if (!courseId) {
            throw new Error('Course không tồn tại.');
        }

        const post = await ForumPost.findOne({
            course: courseId,
            _id: postId
        })


        post.votes.push({
            voteBy : userId,
            voteValue : value
        })

        await post.save();

        return true
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}
