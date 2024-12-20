import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, Typography, Divider } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {getNotes, addNote} from '~/services/noteService';
const NotesSection = ({ videoRef, notesData, onAddNote, onEditNote, onDeleteNote }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setNotes(notesData || []);
  }, [notesData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef && videoRef.current) {
        const player = videoRef.current;
        if (player && typeof player.getCurrentTime === 'function') {
          setCurrentTime(player.getCurrentTime());
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoRef]);

  const handlePauseVideo = () => {
    if (videoRef && videoRef.current) {
      const player = videoRef.current.getInternalPlayer();
      if (player && typeof player.pause === 'function') {
        player.pause();
      }
    }
  };
  const handlePlayVideo = () => {
    if (videoRef && videoRef.current) {
      const player = videoRef.current.getInternalPlayer();
      if (player && typeof player.play === 'function') {
        player.play();
      }
    }
  };
  const handleSeekAndPlayVideo = (time) => {
    if (videoRef && videoRef.current) {
      const player = videoRef.current
      if (player && typeof player.seekTo === 'function') {
        player.seekTo(time);
        handlePlayVideo();
      }
    }
  };

  const handleAddOrUpdateNote = async () => {
    if (currentNote.trim()) {
      const noteWithTime = {
        content: currentNote,
        time: (editingNoteIndex === null)? currentTime : notes[editingNoteIndex].time,
      };

      try {
        if (editingNoteIndex === null) {
          setNotes([...notes, noteWithTime]);
          onAddNote(noteWithTime); // Callback để cập nhật ghi chú toàn cục
        } else {
          const updatedNotes = [...notes];
          updatedNotes[editingNoteIndex] = noteWithTime;
          const noteId = notes[editingNoteIndex]._id;
          onEditNote(noteId, noteWithTime); 
          setNotes(updatedNotes);
          setEditingNoteIndex(null);
        }
        
        setCurrentNote('');
        handlePlayVideo(); // Tiếp tục video sau khi thêm ghi chú
      } catch (error) {
        console.error('Lỗi khi thêm ghi chú:', error);
      }
    }
  };

  const handleEditNote = (index) => {
    handlePauseVideo(); // Dừng video khi chỉnh sửa
    setCurrentNote(notes[index].content);
    setEditingNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    onDeleteNote(notes[index]._id); // Xóa ghi chú trên server
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleCancel = () => {
    setCurrentNote('');
    setEditingNoteIndex(null);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ghi chú
      </Typography>

      <Paper sx={{ padding: 2, boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)' }}>
        <ReactQuill
          value={currentNote}
          onChange={setCurrentNote}
          theme="snow"
          placeholder="Nhập ghi chú của bạn tại đây..."
          onFocus={handlePauseVideo} // Dừng video khi ReactQuill được focus
          onMouseDown={handlePauseVideo} // Dừng video khi người dùng thả chuột vào ReactQuill
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: 1 }} onClick={handleCancel}>
          Hủy
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddOrUpdateNote}>
          {editingNoteIndex === null ? 'Lưu' : 'Cập nhật'}
        </Button>
      </Box>

      <Divider sx={{ marginTop: 3, marginBottom: 2 }} />

      <Paper sx={{ padding: 2 }}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={() => handleSeekAndPlayVideo(note.time)} 
            >
              <Box sx={{ marginRight: 2, minWidth: '40px' }}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    textAlign: 'center',
                  }}
                >
                  {formatTime(note.time)}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: '#f5f5f5',
                  padding: '8px 12px',
                  borderRadius: '5px',
                }}
              >
                <Typography variant="body1">
                  <div dangerouslySetInnerHTML={{ __html: note.content }} />
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', marginLeft: 2 }}>
                <IconButton onClick={() => handleEditNote(index)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDeleteNote(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Chưa có ghi chú.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default NotesSection;
