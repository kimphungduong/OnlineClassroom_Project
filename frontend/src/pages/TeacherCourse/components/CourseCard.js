import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment"; // Đã thay ForumIcon
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={course.image || "https://via.placeholder.com/150"} // Hiển thị ảnh placeholder nếu không có ảnh
        alt="Course Thumbnail"
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {course.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {course.description || "Mô tả khóa học chưa có."}  {/* Hiển thị mô tả nếu có, nếu không sẽ là văn bản mặc định */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<AssignmentIcon />}
          variant="outlined"
          onClick={() => handleNavigate(`/members-stat/${course.slug}`)}
        >
          Tiến độ
        </Button>
        <Button
          size="small"
          startIcon={<TrendingUpIcon />}
          variant="outlined"
          onClick={() => handleNavigate(`/course-stat/${course.slug}`)}
        >
          Thống kê
        </Button>
        <IconButton onClick={() => handleNavigate(`/course-info/${course.slug}/edit`)}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
