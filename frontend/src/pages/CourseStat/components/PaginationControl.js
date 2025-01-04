import React from 'react';
import { Box, Pagination } from '@mui/material';

const PaginationControl = ({ page, totalPages, onPageChange }) => {
  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Pagination
        count={totalPages}
        color="primary"
        page={page}
        onChange={(e, value) => onPageChange(value)}
      />
    </Box>
  );
};

export default PaginationControl;