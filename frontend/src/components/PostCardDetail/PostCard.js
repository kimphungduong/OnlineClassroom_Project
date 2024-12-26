import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const PostCard = ({
  avatar,
  name,
  date,
  title, // Thêm title vào props
  markdownContent,
  postVotes,
  votedPost,
  handlePostVote,
}) => (
  <Card
    style={{
      display: "flex",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        borderRight: "1px solid #ddd",
      }}
    >
      <IconButton
        color={votedPost && "upvote" ? "primary" : "default"}
        onClick={() => handlePostVote("upvote")}
        size="small"
        sx={{
          width: "36px",
          height: "36px",
          border: "1px solid #ccc",
          borderRadius: "50%",
          transition: "all 0.2s ease",
          "&:hover": { backgroundColor: "#e6f7ff" },
        }}
        disabled={votedPost}
      >
        <ArrowUpwardIcon fontSize="small" />
      </IconButton>

      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          margin: "8px 0",
        }}
      >
        {postVotes}
      </Typography>

      <IconButton
        color={votedPost && "downvote" ? "secondary" : "default"}
        onClick={() => handlePostVote("downvote")}
        size="small"
        sx={{
          width: "36px",
          height: "36px",
          border: "1px solid #ccc",
          borderRadius: "50%",
          transition: "all 0.2s ease",
          "&:hover": { backgroundColor: "#fff1f0" },
        }}
        disabled={votedPost}
      >
        <ArrowDownwardIcon fontSize="small" />
      </IconButton>
    </Box>

    <CardContent style={{ flexGrow: 1 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Avatar src={avatar} alt={name} />
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {date}
          </Typography>
        </div>
      </div>
      <Divider />
      {/* Hiển thị title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {title}
      </Typography>
      <Divider />
      {/* Nội dung bài viết */}
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </CardContent>
  </Card>
);

export default PostCard;
