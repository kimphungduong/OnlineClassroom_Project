import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { courseApi } from '~/api';

const AddSectionForm = ({ slug, setSections }) => {
  const [newSectionName, setNewSectionName] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleAddSection = async () => {
    if (!newSectionName.trim()) {
      alert('Vui lòng nhập tên phần mới.');
      return;
    }
  
    try {
      const response = await courseApi.addSection(slug, { title: newSectionName });

  
      const updatedSections = response.data.sections;
      setSections((prevSections) =>
        updatedSections.map((section) =>
          prevSections.find((prevSection) => prevSection._id === section._id) || section
        )
      );
  
      setNewSectionName('');
      setIsAddingSection(false);
      alert('Thêm phần mới thành công!');
    } catch (error) {
      console.error('Error adding new section:', error);
      alert('Đã xảy ra lỗi khi thêm phần mới.');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {!isAddingSection ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddingSection(true)}
        >
          Thêm phần mới
        </Button>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
          <TextField
            label="Tên phần mới"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddSection}>
            Lưu
          </Button>
          <IconButton
            color="secondary"
            onClick={() => {
              setIsAddingSection(false);
              setNewSectionName('');
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default AddSectionForm;
