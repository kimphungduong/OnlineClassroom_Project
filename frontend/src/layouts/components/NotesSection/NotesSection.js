import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, Typography, Divider } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import quill style
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NotesSection = ({ videoRef }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef && videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoRef]);

  const handleAddOrUpdateNote = () => {
    if (currentNote.trim()) {
      const noteWithTime = {
        content: currentNote,
        time: currentTime,
      };

      if (editingNoteIndex === null) {
        setNotes([...notes, noteWithTime]);
      } else {
        const updatedNotes = [...notes];
        updatedNotes[editingNoteIndex] = noteWithTime;
        setNotes(updatedNotes);
        setEditingNoteIndex(null);
      }
      setCurrentNote('');
    }
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index].content);
    setEditingNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleCancel = () => {
    setCurrentNote('');
    setEditingNoteIndex(null);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      ['link']
    ],
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ padding: 3 }} >
      <Typography variant="h6" gutterBottom>
        Ghi chú
      </Typography>

      <Paper sx={{ padding: 2, boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)' }}>
        <ReactQuill
          value={currentNote}
          onChange={setCurrentNote}
          modules={modules}
          theme="snow"
          placeholder="Nhập ghi chú của bạn tại đây..."
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginRight: 1 }}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdateNote}
        >
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
            >
              {/* Thời gian ở bên trái */}
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

              {/* Nội dung ghi chú */}
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

              {/* Nút Edit và Delete */}
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