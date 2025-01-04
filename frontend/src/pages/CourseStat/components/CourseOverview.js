import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const CourseOverview = ({ totalStudents, averageRating }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={6} sm={3} textAlign="center">
          <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
            {totalStudents}
          </Typography>
          <Typography variant="h6">Học viên</Typography>
        </Grid>
        <Grid item xs={6} sm={3} textAlign="center">
          <Typography variant="h3" color="primary" sx={{ fontWeight: "bold" }}>
            {averageRating}
          </Typography>
          <Typography variant="h6">Đánh giá</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CourseOverview;