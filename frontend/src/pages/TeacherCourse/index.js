import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import teacherApi from "../../api/teacherApi";
import CourseCard from "./components/CourseCard"; // Import component thẻ khóa học
import { useNavigate } from "react-router-dom";

const TeacherCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await teacherApi.getTeacher();
        setCourses(response.data.data.courses);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = () => {
    navigate(`/course-new`);
  };

  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh", pb: 5 }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Typography variant="h5" component="div">
            Khóa học của tôi
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ backgroundColor: "black" }}
            onClick={handleAddCourse} 
          >
            Thêm khóa học
          </Button>
        </Stack>

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography
            variant="h6"
            color="error"
            sx={{ textAlign: "center", mt: 4 }}
          >
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <CourseCard course={course} /> {/* Sử dụng component CourseCard */}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TeacherCoursePage;
