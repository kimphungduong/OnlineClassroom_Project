import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';

const BreadcrumbsNav = ({ courseName }) => (
  <Breadcrumbs sx={{ mb: 3 }} separator="›" aria-label="breadcrumb">
    <Link underline="hover" color="inherit" href="/">Trang chủ</Link>
    <Link underline="hover" color="inherit" href="/courses">Danh sách khóa học</Link>
    <Typography color="text.primary">{courseName ? `Chỉnh sửa bài giảng` : 'Chỉnh sửa bài giảng'}</Typography>
  </Breadcrumbs>
);

export default BreadcrumbsNav;
