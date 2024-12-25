import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Box,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

const ForumPostDetail = () => {
const mdParser = new MarkdownIt();

  const author = {
    name: "Nguyễn Văn A",
    avatar: "https://via.placeholder.com/50",
    date: "25/12/2024",
  };

  const markdownContent = `
### Làm sao để có thể giải được bài toán tìm giá trị nhỏ nhất?

Bài toán được trích dẫn trong đề thi THPT 2022, câu số 38 dạng Vận Dụng, mình đã thử nhiều cách và tham khảo tài liệu nhiều nguồn, nhưng vẫn gặp khó khăn. Một số trang hướng dẫn bài toán có thể giải theo cách \`a, b, c\`. 
Có ai có cách nào khác không?
  `;

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Trần Thị B",
      avatar: "https://via.placeholder.com/50",
      date: "25/12/2024 10:00",
      content: "Mình nghĩ bạn có thể thử sử dụng **phương pháp tối ưu hoá gradient descent**.",
      votes: 10,
    },
    {
      id: 2,
      name: "Lê Văn C",
      avatar: "https://via.placeholder.com/50",
      date: "25/12/2024 11:00",
      content: "Bạn thử kiểm tra các điều kiện ban đầu xem đã đầy đủ chưa nhé. ![img](https://raw.githubusercontent.com/mquangcao/CSC13009_EL/refs/heads/main/app/src/main/res/drawable/banana.jpg?token=GHSAT0AAAAAACZAUTHEB2QY2OUV4MRP7S4SZ3L2PQQ)",
      votes: 7,
    },
  ]);

  const handleVote = (id, type) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, votes: type === "upvote" ? comment.votes + 1 : comment.votes - 1 }
          : comment
      )
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Phần bài đăng */}
      <Card style={{ padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <Avatar src={author.avatar} alt={author.name} />
          <div style={{ marginLeft: "10px" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {author.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {author.date}
            </Typography>
          </div>
        </div>
        <Divider />
        <CardContent>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </CardContent>
      </Card>

      {/* Phần bình luận */}
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Bình luận
        </Typography>
        <Divider />
        <List>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              alignItems="flex-start"
              style={{
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Cột upvote/downvote */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "15px",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleVote(comment.id, "upvote")}
                  size="small"
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <Typography variant="h6">{comment.votes}</Typography>
                <IconButton
                  color="secondary"
                  onClick={() => handleVote(comment.id, "downvote")}
                  size="small"
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Box>

              {/* Nội dung bình luận */}
              <Box sx={{ flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <Avatar
                    src={comment.avatar}
                    alt={comment.name}
                    style={{ width: "40px", height: "40px", marginRight: "10px" }}
                  />
                  <div>
                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                      {comment.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {comment.date}
                    </Typography>
                  </div>
                </div>
                <ReactMarkdown>{comment.content}</ReactMarkdown>
              </Box>
            </ListItem>
          ))}
        </List>
      </div>

      {/* Form thêm bình luận */}
      <Card style={{ marginTop: "20px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Typography variant="subtitle1" style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Thêm bình luận
        </Typography>
        <MdEditor style={{ height: '300px',  width : '100%'}} renderHTML={text => mdParser.render(text)} />
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
            }}
            >
            <Button
                variant="contained"
                color="primary"
                sx={{
                    width: "100%",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: "#004ba0",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.3)",
                },
                }}
            >
                Gửi
            </Button>
            </Box>

      </Card>
    </div>
  );
};

export default ForumPostDetail;
