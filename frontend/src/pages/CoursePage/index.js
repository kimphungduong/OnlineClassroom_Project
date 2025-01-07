import React, { useState, useEffect } from 'react';
import { Grid, Box, Tabs, Tab, Container, Typography } from '@mui/material';
import CourseBreadcrumbs from '~/layouts/components/CustomBreadcrumbs';
import VideoPlayer from '~/layouts/components/VideoPlayer';
import NotesSection from '~/layouts/components/NotesSection';
import CourseSidebar from '~/layouts/components/CourseSidebar';
import { useParams } from 'react-router-dom';
import {getCourse, getLesson} from '~/services/courseService';
import {addNote, getNotes, updateNote, deleteNote} from '~/services/noteService';
import { useRef } from 'react';
import ChatRoom from '~/components/ChatRoom';
import ReactQuill from 'react-quill';

const CoursePage = () => {
  const { slugCourse, slugLesson } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [notesData, setNotesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonId, setLessonId] = useState(null);

  // Tạo videoRef
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchCourseAndLessonData = async () => {
      try {
        const courseResponse = await getCourse(slugCourse);
        setCourseData(courseResponse);
        // gọi get Course
        if (slugLesson) {
          const lessonResponse = await getLesson(slugCourse, slugLesson);

          setLessonData(lessonResponse);
          setLessonId(lessonResponse._id);

          const notesResponse = await getNotes(slugCourse, lessonResponse._id);
          setNotesData(notesResponse);
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
    { href: `/detail/${slugCourse}`, label: courseData?.name || 'Loading...' }
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
              <Tab label="Thông tin bài giảng" />
              <Tab label="Tài liệu tham khảo" />
              <Tab label="Ghi chú" />
            </Tabs>
          </Box>
          {tabIndex === 0 && (
            <Box sx={{ mt: 3 }}>
              <ReactQuill
                value={lessonData?.description || ''}
                readOnly={true}
                theme="bubble"
              />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Tài liệu tham khảo
              </Typography>
              {lessonData?.document && lessonData.document.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {lessonData.document.map((doc) => (
                    <Box
                      key={doc._id}
                      sx={{
                        p: 2,
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="a"
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {doc.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        Được tạo vào: {new Date(doc.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Không có tài liệu tham khảo nào.
                </Typography>
              )}
            </Box>
          )}
          {tabIndex === 2 && (
          <NotesSection
            videoRef={videoRef}
            notesData={notesData}
            onAddNote={async (newNote) => {
              try {
                const response = await addNote(lessonData?._id, newNote.content, newNote.time);
                setNotesData([...notesData, response]); // Cập nhật ghi chú mới từ server
              } catch (error) {
                console.error('Error adding note:', error);
              }
            }}
            onEditNote={async (noteId, content) => {
              try {
                const response = await updateNote(noteId, content);
                const updatedNotes = notesData.map((note) => (note._id === response._id ? response : note));
                setNotesData(updatedNotes); // Cập nhật ghi chú mới từ server
              } catch (error) {
                console.error('Error adding note:', error);
              }
            }}
            onDeleteNote={async (noteId) => {
              try{
                const response = await deleteNote(noteId);
                const updatedNotes = notesData.filter((note) => note._id !== noteId);
                setNotesData(updatedNotes); // Cập nhật ghi chú mới từ server
              }
              catch(error){
                console.error('Error deleting note:', error);
              }
              
            }}
          />)}
        </Grid>

        {/* Phần Sidebar */}
        <Grid item xs={12} md={4} sx={{ overflowY: 'auto', minHeight: '100vh' }}>
          <CourseSidebar sections={courseData?.sections} slugCourse={slugCourse} />
        </Grid>
      </Grid>
      <ChatRoom userType="student" courseId={courseData._id} />
    </Container>

  );
};

export default CoursePage;
