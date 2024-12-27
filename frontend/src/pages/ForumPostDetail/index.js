import React, { useState } from "react";
import {
  Typography,
  Divider,
} from "@mui/material";

import { PostCard, CommentList, CommentEditor } from "../../components/PostCardDetail";
import {getForumPostDetail, addComment, voteComment} from "../../services/courseService";
import { useParams, useNavigate } from "react-router-dom";


const ForumPostDetail = () => {
  const [reload, setReload] = useState(false);

  const {slugCourse, postId} = useParams();

  const [postVotes, setPostVotes] = useState(0);
  const [votedPost, setVotedPost] = useState(false);
  const [content, setContent] = useState("");

  const [postContent, setPostContent] = useState({})

  const [comments, setComments] = useState([]);
  const [votedComments, setVotedComments] = useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getForumPostDetail(slugCourse, postId);
      setPostContent(data);
      console.log("=====================================")
      console.log(data)

      setVotedPost(data.votes)
      setComments(data.comments)
    }

    fetchData();
  }, [reload]);



  const handlePostVote = (type) => {
    if (votedPost) {
      alert("Bạn đã vote cho bài viết này!");
      return;
    }
    setPostVotes((prev) => (type === "upvote" ? prev + 1 : prev - 1));
    setVotedPost(true);
  };

  const handleCommentVote = async (id, type) => {
    console.log(id)
    const newComment = await voteComment(slugCourse, postId, id, type === "upvote" ? 1 : -1);
    
    const index = comments.findIndex(item => item._id === newComment._id);
    if (index !== -1) {
      comments[index].votes = newComment.votes;
      comments[index].voted = true
    }

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
        avatar={postContent?.avatar || "https://via.placeholder.com/50"}
        name={postContent?.name || "Người dùng"}
        date={postContent?.createdAt || ""} 
        title={postContent?.title || ""}
        markdownContent={postContent?.content || ""}
        postVotes={postContent?.votes?.reduce((acc, vote) => acc + vote.voteValue, 0) || 0}
        votedPost={votedPost}
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
