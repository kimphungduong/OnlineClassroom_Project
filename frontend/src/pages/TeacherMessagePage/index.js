import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import initializeSocket from '~/services/socketService';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import eventBus from '~/utils/eventBus';


const TeacherMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState();

  const [currentStudent, setCurrentStudent] = useState(conversations[0]);
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState('');
  const [loadRoom, setLoadRoom] = useState(false);
  
  const currentStudentRef = useRef();
  const messagesEndRef = useRef(null); // Ref để cuộn xuống cuối danh sách tin nhắn

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn xuống cuối danh sách
    }
  };

  useEffect(() => {
    const socketInstance = initializeSocket();
    setSocket(socketInstance);

    socketInstance.emit('getAllMsg');

    // Lắng nghe sự kiện trả về các cuộc hội thoại
    socketInstance.on('getAllMsg', (allMsg) => {
      setConversations(allMsg);
      const len = allMsg.filter(e => e.readed === false).length
      eventBus.emit('lenMessage', len);
    });

    // Lắng nghe sự kiện tin nhắn mới
    socketInstance.on('chat message', (msg) => {
      setLoadRoom((prev) => !prev);

      if(!currentStudentRef.current) return;

      if (currentStudentRef.current && msg.studentId === currentStudentRef.current.studentId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }

      socketInstance.emit("selectStudent", {
        receiverID: currentStudentRef.current.studentId,
        courseID: currentStudentRef.current.courseId,
      })

    });

    socketInstance.on('teacher chat message', (msg) => {
      setLoadRoom((prev) => !prev);

      if(!currentStudentRef.current) return;

      if (currentStudentRef.current && msg.studentId === currentStudentRef.current.studentId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }

      socketInstance.emit("selectStudent", {
        receiverID: currentStudentRef.current.studentId,
        courseID: currentStudentRef.current.courseId,
      })

      

    });

    return () => {
      socketInstance.disconnect(); // Ngắt kết nối khi rời phòng
    };
  }, []);

  useEffect(() => {
    currentStudentRef.current = currentStudent;
  }, [conversations,currentStudent]);

  useEffect(() => {
    scrollToBottom(); // Cuộn xuống cuối mỗi khi danh sách tin nhắn thay đổi
  }, [messages]);

  useEffect(() => {
    socket?.emit('getAllMsg');
    if(!currentStudentRef.current) return;
    handleSelectStudent(currentStudentRef.current)
  }, [loadRoom]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      message: newMessage,
      sender: 'teacher',
      timestamp: new Date().toISOString(),
      
    };

    socket.emit("teacher chat message", {
      message: newMessage,
      courseId: currentStudent.courseId,
      receiverID: currentStudent.studentId,
    });

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleSelectStudent = (conversation) => {
    currentStudentRef.current = conversation;
    setCurrentStudent(conversation);
    if(!socket) return

    const newConversations = conversations.map((item) => {
      if (item.id === conversation.id) {
        return { ...item, readed: true };
      }
      return item;
    })

    const len = newConversations.filter(e => e.readed === false).length
    eventBus.emit('lenMessage', len);

    setConversations(newConversations);

    socket.emit("loadMessaged", {
      receiverID: conversation.studentId,
      courseID: conversation.courseId,
    });

    socket.emit("selectStudent", {
      receiverID: conversation.studentId,
      courseID: conversation.courseId,
    })

    socket.on("loadMessaged", (loadedMessages) => {
      setMessages(loadedMessages);
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '91vh', width: '100vw', backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '20%',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
          Người dùng
        </Typography>
        <List>
          {conversations.map((conversation) => (
            console.log(conversation),
            <ListItem
              key={conversation?.id || ""}
              button
              onClick={() => handleSelectStudent(conversation)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  fontWeight: 'bold',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#bbdefb',
                },
              }}
            >
              <Avatar src={conversation.studentAvatar} sx={{ mr: 1 }} />
              <ListItemText
                primary={conversation.studentName}
                secondary={conversation.courseName}
                primaryTypographyProps={{
                  fontWeight: conversation.readed === false ? 'bold' : 'normal', // In đậm nếu unread là true
                }}
                secondaryTypographyProps={{
                  fontWeight: conversation.readed === false ? 'bold' : 'normal',
                }}
                sx={{ color: '#424242' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6">{currentStudent?.studentName ? currentStudent?.courseName + (currentStudent.role === "student" ? " - Học viên : " : " - Giảng viên : ") + currentStudent?.studentName : ""}</Typography>
        </Box>

        {/* Messages List */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            backgroundColor: '#f0f4f8',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.sender === 'teacher' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                display: 'flex',
                flexDirection: message.sender === 'teacher' ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}
            >
              {message.sender === 'student' && <Avatar sx={{ mr: 1 }} src={message.avatar} />}
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: message.sender === 'teacher' ? '#bbdefb' : '#ffffff',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {message.message}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  {formatDistanceToNow(parseISO(message.timestamp), { addSuffix: true, locale: vi })}
                </Typography>
              </Paper>
            </Box>
          ))}

          {/* Ref element để cuộn xuống */}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        {messages.length > 0 && (
          <Box
            sx={{
              p: 2,
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder="Nhập tin nhắn"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              variant="outlined"
              size="medium"
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              startIcon={<SendIcon />}
              sx={{
                textTransform: 'none',
                backgroundColor: '#42a5f5',
                '&:hover': { backgroundColor: '#1e88e5' },
              }}
            >
              Gửi
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TeacherMessages;
