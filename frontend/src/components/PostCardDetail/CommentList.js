import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  IconButton,
  Box,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


const CommentList = ({ comments, handleCommentVote }) => (
    
    <List>
      {comments.map((comment) => (
        <ListItem
          key={comment.id}
          alignItems="flex-start"
          style={{
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              width: "50px",
              textAlign: "center",
              gap: "10px",
            }}
          >
            <IconButton
              onClick={() => handleCommentVote(comment._id, "upvote")}
              size="small"
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid #ccc",
                borderRadius: "50%",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: "#e6f7ff" },
              }}
              disabled={comment.voted}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
  
            <Typography
              variant="h6"
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {comment.voteCount}
            </Typography>
  
            <IconButton
              onClick={() => handleCommentVote(comment._id, "downvote")}
              size="small"
              sx={{
                width: "36px",
                height: "36px",
                border: "1px solid #ccc",
                borderRadius: "50%",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: "#fff1f0" },
              }}
              disabled={comment.voted}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
          </Box>
  
          <Box sx={{ flexGrow: 1, marginLeft: "10px", marginTop: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <Avatar
                src={comment.avatar}
                alt={comment.name}
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                }}
              />
              <div>
                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                  {comment.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {comment.createdAt}
                </Typography>
              </div>
            </div>
            <ReactMarkdown>{comment.content}</ReactMarkdown>
          </Box>
        </ListItem>
      ))}
    </List>
  );

export default CommentList;