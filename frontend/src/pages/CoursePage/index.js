import React, { useState, useEffect } from 'react';
import { Grid, Box, Tabs, Tab, Container } from '@mui/material';
import CourseBreadcrumbs from '~/layouts/components/CustomBreadcrumbs';
import VideoPlayer from '~/layouts/components/VideoPlayer';
import NotesSection from '~/layouts/components/NotesSection';
import CourseSidebar from '~/layouts/components/CourseSidebar';
import { useParams } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import { useRef } from 'react';

const CoursePage = () => {
  const { slugCourse, slugLesson } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [notesData, setNotesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tạo videoRef
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchCourseAndLessonData = async () => {
      try {
        const courseResponse = await courseApi.getCourse(slugCourse);
        setCourseData(courseResponse.data);

        if (slugLesson) {
          const lessonResponse = await courseApi.getLesson(slugCourse, slugLesson);
          setLessonData(lessonResponse.data);

          const notesResponse = await courseApi.getNotes(slugCourse, lessonResponse.data._id);
          setNotesData(notesResponse.data);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourseAndLessonData();
  }, [slugCourse, slugLesson]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const breadcrumbsLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: `/courses/${slugCourse}`, label: courseData?.name || 'Loading...' }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxWidth="false" sx={{ mt: 1, p: '5px 10px !important', background: 'white' }}>
      <Box sx={{ backgroundColor: 'white', p: 1, mb: 1, border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 1, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
        <CourseBreadcrumbs links={breadcrumbsLinks} current="Current Page" />
      </Box>
      <Grid container spacing={2}>
        {/* Phần Video và Tabs */}
        <Grid item xs={12} md={8} sx={{ overflowY: 'auto', minHeight: '100vh' }}>
          <VideoPlayer url={lessonData?.videoUrl} title={lessonData?.name} videoRef={videoRef} />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleChange} aria-label="tabs">
              <Tab label="Các thông báo" />
              <Tab label="Đánh giá và phản hồi" />
              <Tab label="Ghi chú" />
            </Tabs>
          </Box>
          <NotesSection
            videoRef={videoRef}
            notesData={notesData}
            onAddNote={async (newNote) => {
              try {
                const response = await courseApi.addNote(lessonData?._id, newNote);
                setNotesData([...notesData, response.data]); // Cập nhật ghi chú mới từ server
              } catch (error) {
                console.error('Error adding note:', error);
              }
            }}
          />
        </Grid>

        {/* Phần Sidebar */}
        <Grid item xs={12} md={4} sx={{ overflowY: 'auto', minHeight: '100vh' }}>
          <CourseSidebar sections={courseData?.sections} slugCourse={slugCourse} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoursePage;
