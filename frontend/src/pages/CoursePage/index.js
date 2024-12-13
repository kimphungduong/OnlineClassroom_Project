import React, { useState } from 'react';
import { Grid, Box,Tabs, Tab, Container } from '@mui/material';
import CourseBreadcrumbs from '~/layouts/components/CustomBreadcrumbs';
import VideoPlayer from '~/layouts/components/VideoPlayer';
import NotesSection from '~/layouts/components/NotesSection';
import CourseSidebar from '~/layouts/components/CourseSidebar';

const CoursePage = () => {
    const [tabIndex, setTabIndex] = useState(0);
      
    const handleChange = (event, newValue) => {
      setTabIndex(newValue);
      //onTabChange(newValue);
    };
    const breadcrumbsLinks = [
        { href: '/', label: 'Home' },
        { href: '/courses', label: 'Courses' },
        { href: '/courses/1', label: 'Course 1' },
      ];
  return (
    <Container maxWidth='false' sx={{mt:1, p:'10px !important', background: '#f4f4f4'}}>
      <CourseBreadcrumbs links={breadcrumbsLinks} ml={1} current="Current Page" />
      <Grid container spacing={2}>
        {/* Phần Video và Tabs */}
        <Grid item xs={12} md={8} sx={{  overflowY: 'auto',  minHeight:'100vh'}}>
          <VideoPlayer url='https://www.youtube.com/watch?v=7nFsambeTqY' title='Vong linh đau khổ muốn giải nghệ - Tập 10 [Việt sub]' />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="tabs">
                    <Tab label="Các thông báo" />
                    <Tab label="Đánh giá và phản hồi" />
                    <Tab label="Ghi chú" />
                </Tabs>
            </Box>
          <NotesSection />
        </Grid>

        {/* Phần Sidebar */}
        <Grid item xs={12} md={4} sx={{ overflowY: 'auto', minHeight:'100vh'}}>
          <CourseSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoursePage;
