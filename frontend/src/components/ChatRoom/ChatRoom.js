import React, { useEffect, useState } from "react";
import initializeSocket from "~/services/socketService";
import classNames from "classnames/bind";
import styles from "./ChatRoom.module.scss";

// MUI components
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const cx = classNames.bind(styles);

const ChatRoom = ({ userName, courseId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái mở/đóng phòng chat

  useEffect(() => {
    if (isChatOpen) {
      const socketInstance = initializeSocket();
      setSocket(socketInstance);

      // Kết nối và tham gia phòng chat
      socketInstance.emit("connection");

      // Tải tin nhắn cũ
      socketInstance.emit("load-messages", courseId);

      // Lắng nghe tin nhắn cũ
      socketInstance.on("load old messages", (loadedMessages) => {
        setMessages(loadedMessages);
      });

      // Lắng nghe tin nhắn mới
      socketInstance.on("chat message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socketInstance.disconnect(); // Ngắt kết nối khi rời phòng
      };
    }
  }, [isChatOpen, courseId]);

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        sender: 'Bạn',
        receiver: 'Teacher',
        content: newMessage,
        sentAt: new Date(),
      };

      // Gửi tin nhắn tới server
      socket.emit("chat message", {message: messageData.content, courseId});

      // Cập nhật tin nhắn trong giao diện
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <>
      {/* Nút mở chat */}
      <IconButton

        className={cx("chat-toggle")}
        onClick={() => setIsChatOpen(!isChatOpen)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "rgba(98, 0, 234, 0.8)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(55, 0, 179, 0.8)",
          },
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
        }}
      >
        {isChatOpen ? "✕" : <ChatIcon />}
      </IconButton>

      {/* Giao diện phòng chat */}
      {isChatOpen && (
        <Paper
          elevation={3}
          className={cx("chat-room")}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 360,
            height: 500,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f8e8e8",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              backgroundColor: "#fff",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Avatar sx={{ bgcolor: "#007bff", marginRight: 2 }}>"Phan Phúc"</Avatar>
              <Typography variant="h6">{userName}</Typography> */}
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === 'Bạn' ? "flex-end" : "flex-start",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: msg.sender === 'Bạn' ? "#d1e7dd" : "#fff",
                    border: "1px solid #ccc",
                  }}
                >
                  <Typography>{msg.content}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "gray", fontSize: "0.8rem" }}
                    >
                      {new Date(msg.sentAt).toLocaleTimeString()}
                    </Typography>
                    {msg.sender === 'Bạn' && (
                      <DoneAllIcon sx={{ fontSize: "1rem", color: "blue" }} />
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input Box */}
          <Box
            sx={{
              display: "flex",
              padding: 2,
              borderTop: "1px solid #ccc",
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <IconButton
              onClick={sendMessage}
              sx={{
                marginLeft: 1,
                backgroundColor: "#6200ea",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3700b3",
                },
                height: "30px",
                width: "30px",
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatRoom;
