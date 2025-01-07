const { addPost, getAllPosts, getPost, addComment, addVote, addVotePost } = require('../services/ForumPostService');

module.exports.addPost = async(req, res) => {
    try {
        const { slug } = req.params;
        const { title, content } = req.body;
        const post = await addPost(title, content, req.user.userId, slug);
        res.json({
            success: true,
            data : post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi thêm bài viết', error });
    }
}

module.exports.getAllPosts = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await getAllPosts(slug);
        res.json({
            success: true,
            data : post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi thêm bài viết', error });
    }
}

module.exports.getPost = async (req, res) => {
    try {
        const { slug, postId } = req.params;
        const post = await getPost(slug, postId, req.user.userId);
        res.json({
            success: true,
            data : post
        })
    }
    catch (error) {
        res.status(500).json({message : 'Lỗi khi lấy bài viết',  error });
    }
}

module.exports.addComment = async (req, res) => {
    try {
        const { slug, postId } = req.params;
        const { content } = req.body;
        const comment = await addComment(slug, postId, req.user.userId, content);
        res.json({
            success: true,
            data : comment
        })
    }
    catch (error) {
        res.status(500).json({message : 'Lỗi khi thêm comment',  error });
    }
}

module.exports.voteComment = async (req, res) => {
    try {
        const { slug, postId } = req.params;
        const { commentId, value } = req.body;
        const comment = await addVote(slug, postId, req.user.userId, commentId, value);

        res.json({
            success: true,
            data : comment
        })
    }
    catch (error) {
        res.status(500).json({message : "Lỗi khi voteComment" , error})
    }
}

module.exports.votePost = async (req, res) => {
    try {
        const { slug, postId } = req.params;
        const { value } = req.body;
        const result = await addVotePost(slug, postId, req.user.userId, value);

        res.json({
            success: true,
            data : result
        })
    }
    catch (error) {
        res.status(500).json({message : "Lỗi khi votePost" , error})
    }
}