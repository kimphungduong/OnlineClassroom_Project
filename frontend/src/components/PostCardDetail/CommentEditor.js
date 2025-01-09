import React from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {
  Card,
  Typography,
  Box,
  Button,
} from "@mui/material";

const CommentEditor = ({ content, handleEditorChange, handleSubmit }) => {
  const mdParser = new MarkdownIt();

  return (
    <Card style={{ marginTop: "20px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Typography variant="subtitle1" style={{ marginBottom: "10px", fontWeight: "bold" }}>
        Thêm bình luận
      </Typography>
      <MdEditor
        style={{ height: "300px", width: "100%" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={content}
      />
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
          onClick={handleSubmit}
        >
          Gửi
        </Button>
      </Box>
    </Card>
  );
};

export default CommentEditor;