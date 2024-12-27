import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const DeleteSectionButton = ({ slug, sectionId, setSections }) => {
    const handleDeleteSection = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phần này?')) return;
        
        try {
            const response = await axios.delete(
            `http://localhost:5000/api/course/${slug}/section/${sectionId}`
            );
            
            const updatedSections = response.data.sections;
            setSections((prevSections) =>
            updatedSections.map((section) =>
                prevSections.find((prevSection) => prevSection._id === section._id) || section
            )
            );
            alert('Xóa phần thành công!');
        } catch (error) {
            console.error('Error deleting section:', error);
            alert('Đã xảy ra lỗi khi xóa phần.');
        }
    };

  return (
    <IconButton color="error" onClick={handleDeleteSection}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteSectionButton;