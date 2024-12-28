import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import "./CommentItem.css";

const CommentItem = ({ title, authorName, authorAvatar, votes, replies, onClick }) => (
  <Card
    className="comment-item"
    onClick={onClick}
    sx={
        {
            cursor: "pointer",
            boxShadow: 3,
            padding: 2,
            width: "100%", // Để thẻ tự điều chỉnh theo màn hình
            maxWidth: 600, // Giới hạn chiều rộng tối đa
            minHeight: 120, // Chiều cao tối thiểu
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }
    }
  >
    <CardContent>
      {/* Header: Avatar + Tên Tác Giả */}
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Avatar src={authorAvatar} alt={authorName} sx={{ width: 25, height: 25 }} />
        <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: 500 }}>
          {authorName}
        </Typography>
      </Box>

      {/* Tiêu đề */}
      <Typography variant="h6" className="comment-title" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>

      {/* Metadata: Votes và Replies */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <ThumbUpOutlinedIcon fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
            {votes} votes
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <CommentOutlinedIcon fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
            {replies} answers
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default CommentItem;
