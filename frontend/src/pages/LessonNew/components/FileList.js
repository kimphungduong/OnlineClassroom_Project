import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileList = ({ files, onDeleteFile }) => {
  return (
    <Box>
      {files.map((file, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ flex: 1 }}>{file.name}</Typography> {/* Hiển thị tên tệp */}
          <IconButton onClick={() => onDeleteFile(index)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default FileList;
