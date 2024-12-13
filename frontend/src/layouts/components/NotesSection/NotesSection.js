import React, { useState } from 'react';
import { Box, Button, IconButton, Paper, Typography, Divider } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import quill style
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

const NotesSection = () => {
  // State để lưu ghi chú và ghi chú hiện tại đang chỉnh sửa
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  // Hàm thêm ghi chú mới hoặc cập nhật ghi chú đã chỉnh sửa
  const handleAddOrUpdateNote = () => {
    if (currentNote.trim()) {
      if (editingNoteIndex === null) {
        // Thêm ghi chú mới (lưu dưới dạng HTML)
        setNotes([...notes, currentNote]);
      } else {
        // Cập nhật ghi chú đang chỉnh sửa
        const updatedNotes = [...notes];
        updatedNotes[editingNoteIndex] = currentNote;
        setNotes(updatedNotes);
        setEditingNoteIndex(null);
      }
      setCurrentNote('');
    }
  };

  // Hàm chỉnh sửa ghi chú
  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setEditingNoteIndex(index);
  };

  // Hàm xóa ghi chú
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Hàm hủy thay đổi
  const handleCancel = () => {
    setCurrentNote('');
    setEditingNoteIndex(null);
  };

  // Cấu hình toolbar cho react-quill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      ['link']
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ghi chú
      </Typography>

      {/* Text editor (React-Quill) */}
      <Paper sx={{ padding: 2 }}>
        <ReactQuill
          value={currentNote}
          onChange={setCurrentNote}
          modules={modules}
          theme="snow"
          placeholder="Nhập ghi chú của bạn tại đây..."
        />
      </Paper>

      {/* Nút Lưu và Hủy */}
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

      {/* Divider */}
      <Divider sx={{ marginTop: 3, marginBottom: 2 }} />

      {/* Danh sách ghi chú */}
      <Paper sx={{ padding: 2 }}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">
                  {/* Render nội dung HTML của ghi chú */}
                  <div dangerouslySetInnerHTML={{ __html: note }} />
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleEditNote(index)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNote(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
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
