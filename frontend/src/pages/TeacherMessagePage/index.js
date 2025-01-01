import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

const TeacherMessages = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: 'Student A', lastMessage: 'I have a problem with a topup' },
    { id: 2, name: 'Student B', lastMessage: 'Can you explain this topic?' },
    { id: 3, name: 'Student C', lastMessage: 'Thank you for the help!' },
  ]);

  const [currentStudent, setCurrentStudent] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { content: 'I have a problem with a topup', sender: 'student', timestamp: '2025-01-01T13:08:00Z' },
    { content: 'Bạn có vấn đề gì?', sender: 'teacher', timestamp: '2025-01-01T13:09:00Z' },
  ]); // Sample messages
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      content: newMessage,
      sender: 'teacher',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleSelectStudent = (student) => {
    setCurrentStudent(student);
    // Reset messages or load specific messages for this student
    setMessages([
      { content: `Conversation with ${student.name}`, sender: 'student', timestamp: '2025-01-01T13:00:00Z' },
    ]);
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
          Học sinh
        </Typography>
        <List>
          {conversations.map((student) => (
            <ListItem
              key={student.id}
              button
              selected={currentStudent.id === student.id}
              onClick={() => handleSelectStudent(student)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            >
              <Avatar sx={{ bgcolor: '#64b5f6', mr: 2 }}>{student.name.charAt(0)}</Avatar>
              <ListItemText
                primary={student.name}
                secondary={student.lastMessage}
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
          <Typography variant="h6">{currentStudent.name}</Typography>
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
              sx={{              alignSelf: message.sender === 'teacher' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                display: 'flex',
                flexDirection: message.sender === 'teacher' ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}
            >
              {message.sender === 'student' && (
                <Avatar sx={{ bgcolor: '#ff5722', width: 36, height: 36, mr: 1 }}>
                  {message.sender.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: message.sender === 'teacher' ? '#bbdefb' : '#ffffff',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {message.content}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
  
        {/* Message Input */}
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
                  e.preventDefault(); // Ngăn form gửi mặc định (nếu có)
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
            sx={{ textTransform: 'none', backgroundColor: '#42a5f5', '&:hover': { backgroundColor: '#1e88e5' } }}
          >
            Gửi
          </Button>
        </Box>
      </Box>
    </Box>
  );
  };
  
  export default TeacherMessages;