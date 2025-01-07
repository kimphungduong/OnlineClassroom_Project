import React, { useState } from "react";
import {
  Typography,
  Divider,
  Pagination,
} from "@mui/material";

import { PostCard, CommentList, CommentEditor } from "../../components/PostCardDetail";
import { getForumPostDetail, addComment, voteComment, votePost } from "../../services/courseService";
import { useParams } from "react-router-dom";

const ForumPostDetail = () => {
  const [reload, setReload] = useState(false);

  const { slugCourse, postId } = useParams();

  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");

  const [comments, setComments] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // Số bình luận hiển thị trên mỗi trang

  React.useEffect(() => {
    console.log("check")
    const fetchData = async () => {
      const data = await getForumPostDetail(slugCourse, postId);

      setPost({
        avatar: data.avatar,
        name: data.name,
        date: data.createdAt,
        title: data.title,
        markdownContent: data.content,
        postVotes: data.voteCount,
        votedPost: data.voted,
      });

      setComments(data.comments);
    };

    fetchData();
  }, [reload]);

  const handlePostVote = async (type) => {
    setPost({
      ...post,
      postVotes: post.voteCount + (type === "upvote" ? 1 : -1),
      votedPost: true,
    });

    await votePost(slugCourse, postId, type === "upvote" ? 1 : -1);
    setReload(!reload);
  };

  const votingComments = new Set();

  const handleCommentVote = async (id, type) => {

    if (votingComments.has(id)) {
      // Nếu comment đang được xử lý, không làm gì cả
      return;
    }

    votingComments.add(id);

    const index = comments.findIndex((item) => item._id === id);
    if (index !== -1) {
      // Cập nhật UI ngay lập tức
      const updatedComments = [...comments];
      updatedComments[index].votes = updatedComments[index].votes + (type === "upvote" ? 1 : -1);
      updatedComments[index].voted = true; // Đánh dấu đã vote
      setComments(updatedComments);

      try {
        // Gửi yêu cầu API
        await voteComment(slugCourse, postId, id, type === "upvote" ? 1 : -1);
      } catch (error) {
        console.error("Lỗi khi vote:", error);
        // Nếu API lỗi, hoàn tác vote
        updatedComments[index].votes = updatedComments[index].votes - (type === "upvote" ? 1 : -1);
        updatedComments[index].voted = false;
        setComments(updatedComments);
      } finally {
        // Xóa ID khỏi Set khi xử lý xong
        votingComments.delete(id);
      }
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

    const newComment = await addComment(slugCourse, postId, { content: content });
    newComment.voteCount = 0;
    newComment.voted = false;

    setComments([newComment, ...comments]);
    setContent("");
  };

  // Pagination handlers
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Tính toán các bình luận hiển thị
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {post && (<PostCard
        avatar={post?.avatar || "https://via.placeholder.com/50"}
        name={post?.name || "Người dùng"}
        date={post?.date || ""}
        title={post?.title || ""}
        markdownContent={post?.markdownContent || ""}
        postVotes={post?.postVotes || 0}
        votedPost={post?.votedPost ?? true}
        handlePostVote={handlePostVote}
      />)}

      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Bình luận
        </Typography>
        <Divider />
        {currentComments.length > 0 && (
          <CommentList
            comments={currentComments}
            handleCommentVote={handleCommentVote}
          />
        )}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(comments.length / commentsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
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
