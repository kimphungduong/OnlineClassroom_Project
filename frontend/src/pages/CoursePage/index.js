import React, { useState, useEffect, useRef } from "react";
import { Grid, Box, Tabs, Tab, Container, Typography, Button } from "@mui/material";
import CourseBreadcrumbs from "~/layouts/components/CustomBreadcrumbs";
import VideoPlayer from "~/layouts/components/VideoPlayer";
import NotesSection from "~/layouts/components/NotesSection";
import CourseSidebar from "~/layouts/components/CourseSidebar";
import NotesSidebar from "~/components/NotesSidebar";
import { useParams } from "react-router-dom";
import { getCourse, getLesson } from "~/services/courseService";
import { addNote, getNotes, updateNote, deleteNote } from "~/services/noteService";
import noteApi from "~/api/noteApi";
import ReactQuill from "react-quill";
import {useSearchParams} from "react-router-dom";
import { notification } from "antd";
import reviewApi from "~/api/reviewApi";
import ChatRoom from "~/components/ChatRoom";

const CoursePage = () => {
  const [searchParams] = useSearchParams(); // Đọc query params
  const startTime = parseFloat(searchParams.get("time")) || 0; // Lấy giá trị time (mặc định là 0)

  const { slugCourse, slugLesson } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [notesData, setNotesData] = useState([]); // Khởi tạo là mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allNotes, setAllNotes] = useState([]); // Khởi tạo là mảng rỗng
  const [lessonId, setLessonId] = useState(null);

  // Tạo videoRef
  const videoRef = useRef(null);

  // State để mở/đóng thanh NotesSidebar
  const [isNotesSidebarOpen, setNotesSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourseAndLessonData = async () => {
      try {
        const courseResponse = await getCourse(slugCourse);
        setCourseData(courseResponse);

        if (slugLesson) {
          const lessonResponse = await getLesson(slugCourse, slugLesson);

          setLessonData(lessonResponse);
          setLessonId(lessonResponse._id);

          const notesResponse = await getNotes(slugCourse, lessonResponse._id);
          setNotesData(notesResponse || []); // Đảm bảo luôn là mảng
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourseAndLessonData();
  }, [slugCourse, slugLesson]);

  useEffect(() => {
    // Cập nhật startTime mỗi khi searchParams thay đổi
    if (videoRef.current) {
      videoRef.current.seekTo(startTime); // Seek đến thời điểm mới
    }
  }, [searchParams]);

  // Gọi API để lấy tất cả ghi chú khi mở NotesSidebar
  const handleOpenNotesSidebar = async () => {
    try {
      setNotesSidebarOpen(true); // Mở NotesSidebar trước
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const breadcrumbsLinks = [
    { href: "/", label: "Home" },
    { href: "/my-course", label: "Khóa học của tôi" },
    { href: `/detail/${slugCourse}`, label: courseData?.name || "Loading..." },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleReviewSubmit = async (review) => {
    try {
      const response = await reviewApi.addReview({...review, courseId: courseData._id});
      console.log("Review submitted:", response);
      notification.success({
        message: "Đánh giá thành công",
        description: "Cảm ơn bạn đã đánh giá khóa học!",
      });
    } catch (error) {
      notification.error({
        message: "Đánh giá thất bại",
        description: "Có lỗi xảy ra khi đánh giá khóa học!",
      });

      console.error("Error submitting review:", error);
    }
  }

  return (
    <Container
      maxWidth="false"
      sx={{ mt: 1, p: "5px 10px !important", background: "white" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 1,
          mb: 1,
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: 1,
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CourseBreadcrumbs links={breadcrumbsLinks} current="Current Page" />
      </Box>
      <Grid container spacing={2}>
        {/* Phần Video và Tabs */}
        <Grid item xs={12} md={8} sx={{ overflowY: "auto", minHeight: "100vh" }}>
          <VideoPlayer
            url={lessonData?.videoUrl}
            lessonId={lessonData?._id}
            videoRef={videoRef}
            startTime={startTime}
          />
          <Button
            variant="outlined"
            onClick={handleOpenNotesSidebar} // Mở NotesSidebar khi bấm nút
            sx={{ mt: 2 }}
          >
            Hiển thị ghi chú
          </Button>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabIndex} onChange={handleChange} aria-label="tabs">
              <Tab label="Thông tin bài giảng" />
              <Tab label="Tài liệu tham khảo" />
              <Tab label="Ghi chú" />
            </Tabs>
          </Box>
          {tabIndex === 0 && (
            <Box sx={{ mt: 3 }}>
              <ReactQuill
                value={lessonData?.description || ""}
                readOnly={true}
                theme="bubble"
              />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Tài liệu tham khảo
              </Typography>
              {lessonData?.document && lessonData.document.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {lessonData.document.map((doc) => (
                    <Box
                      key={doc._id}
                      sx={{
                        p: 2,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
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
                          color: "primary.main",
                          textDecoration: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {doc.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mt: 0.5 }}
                      >
                        Được tạo vào:{" "}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
                  const response = await addNote(
                    lessonData?._id,
                    newNote.content,
                    newNote.time
                  );
                  setNotesData([...(notesData || []), response]); // Đảm bảo notesData là mảng
                } catch (error) {
                  console.error("Error adding note:", error);
                }
              }}
              onEditNote={async (noteId, content) => {
                try {
                  const response = await updateNote(noteId, content);
                  const updatedNotes = (notesData || []).map((note) =>
                    note._id === response._id ? response : note
                  );
                  setNotesData(updatedNotes);
                } catch (error) {
                  console.error("Error editing note:", error);
                }
              }}
              onDeleteNote={async (noteId) => {
                try {
                  await deleteNote(noteId);
                  const updatedNotes = (notesData || []).filter(
                    (note) => note._id !== noteId
                  );
                  setNotesData(updatedNotes);
                } catch (error) {
                  console.error("Error deleting note:", error);
                }
              }}
            />
          )}
        </Grid>

        {/* Phần Sidebar */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ overflowY: "auto", minHeight: "100vh" }}
        >
          <CourseSidebar
            sections={courseData?.sections}
            slugCourse={slugCourse}
            progress={courseData?.progress}
            onSubmitReview={handleReviewSubmit}

          />
        </Grid>
      </Grid>

      {/* Thanh NotesSidebar */}
      <NotesSidebar
        visible={isNotesSidebarOpen}
        onClose={() => setNotesSidebarOpen(false)}
        courseId={courseData?._id}
        videoRef={videoRef}
        currentLessonId={lessonData?._id} // Bài giảng hiện tại
      />
      <ChatRoom userType="student" userName={courseData.teacher.name} courseId={courseData._id} />
    </Container>
  );
};

export default CoursePage;
