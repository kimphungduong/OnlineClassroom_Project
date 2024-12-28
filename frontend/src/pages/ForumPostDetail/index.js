import React, { useState } from "react";
import {
  Typography,
  Divider,
} from "@mui/material";

import { PostCard, CommentList, CommentEditor } from "../../components/PostCardDetail";
import {getForumPostDetail, addComment, voteComment, votePost} from "../../services/courseService";
import { useParams, useNavigate } from "react-router-dom";


const ForumPostDetail = () => {
  const [reload, setReload] = useState(false);

  const {slugCourse, postId} = useParams();

  const [post, setPost] = useState();
  const [content, setContent] = useState("");

  const [postContent, setPostContent] = useState({})

  const [comments, setComments] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getForumPostDetail(slugCourse, postId);
      setPostContent(data);
      console.log("=====================================")
      console.log(data)
      setPost({
        avatar: data.avatar,
        name: data.name,
        date: data.createdAt,
        title: data.title,
        markdownContent: data.content,
        postVotes: data.voteCount,
        votedPost: data.voted
      });

      setComments(data.comments)
    }

    fetchData();
  }, [reload]);



  const handlePostVote = async (type) => {
    //handle before call API
    setPost({
      ...post,
      postVotes: post.voteCount + (type === "upvote" ? 1 : -1),
      votedPost: true
    });

    const result = await votePost(slugCourse, postId, type === "upvote" ? 1 : -1);

    postContent.voted = result
    setReload(!reload);
  };

  const handleCommentVote = async (id, type) => {
    const index = comments.findIndex(item => item._id === id);
    if (index !== -1) {
      comments[index].votes = comments[index].votes + (type === "upvote" ? 1 : -1);
      comments[index].voted = true
    }

    const newComment = await voteComment(slugCourse, postId, id, type === "upvote" ? 1 : -1);
    
    setReload(!reload);
  };

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Vui lòng nhập nội dung bình luận trước khi gửi!");
      return;
    }

    const newComment = await addComment(slugCourse, postId, { content : content });
    newComment.voteCount = 0
    newComment.voted = false

    setComments([...comments, newComment]);
    setContent("");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <PostCard
        avatar={post?.avatar || "https://via.placeholder.com/50"}
        name={post?.name || "Người dùng"}
        date={post?.date || ""} 
        title={post?.title || ""}
        markdownContent={post?.markdownContent || ""}
        postVotes={post?.postVotes || 0}
        votedPost={post?.votedPost ?? true}
        handlePostVote={handlePostVote}
      />

      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Bình luận
        </Typography>
        <Divider />
        <CommentList
          comments={comments}
          handleCommentVote={handleCommentVote}
        />
        <CommentEditor
          content={content}
          handleEditorChange={handleEditorChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ForumPostDetail;
