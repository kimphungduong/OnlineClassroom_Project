import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import courseApi from '~/api/courseApi';
import { notification } from 'antd';

const DeleteSectionButton = ({ slug, sectionId, setSections }) => {
    const handleDeleteSection = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phần này?')) return;
        
        try {
            const response = await courseApi.deleteSection(slug, sectionId);

            const updatedSections = response.data.sections;
            setSections((prevSections) =>
            updatedSections.map((section) =>
                prevSections.find((prevSection) => prevSection._id === section._id) || section
            )
            );
            notification.success({
                message: 'Xóa phần thành công',
                description: `Đã xóa phần thành công.`,
            });
        } catch (error) {
            console.error('Error deleting section:', error);
            notification.error({
                message: 'Lỗi',
                description: error.response?.data.message || 'Đã xảy ra lỗi khi xóa phần.',
            });
        }
    };

  return (
    <IconButton color="error" onClick={handleDeleteSection}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteSectionButton;