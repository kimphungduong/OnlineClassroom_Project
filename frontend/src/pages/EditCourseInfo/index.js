import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Typography, Grid, InputAdornment, Container } from "@mui/material";
import axios from "axios";
import { UploadImage } from "../../components/UploadFile";
import subjectApi from "../../api/subjectApi";
import uploadApi from "../../api/uploadApi";
import courseApi from "../../api/courseApi";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate

const EditCourseForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); // Khai báo useNavigate
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    price: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await subjectApi.getAllSubject();
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thể loại:", error);
        alert("Không thể lấy thể loại, vui lòng thử lại.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!slug) return;

      try {
        const response = await courseApi.getCourseInfo(slug);
        const courseData = response.data;
        setCourse(courseData);
        setFormData({
          name: courseData.name,
          subject: courseData.subject,
          description: courseData.description,
          price: courseData.price,
          image: courseData.image,
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error);
        alert("Không thể lấy thông tin khóa học.");
      }
    };

    fetchCourseDetails();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadApi.uploadImage(formData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (formData.price <= 0) {
      alert("Giá tiền phải lớn hơn 0.");
      return;
    }
  
    if (formData.name.trim().length < 5 || formData.name.trim().length > 100) {
      alert("Tên khóa học phải từ 5 đến 100 ký tự.");
      return;
    }
    
    setLoading(true);
    try {
      const imageResponse = formData.imageFile
        ? await uploadFile(formData.imageFile)
        : null;

      const payload = {
        name: formData.name,
        subject: formData.subject,
        description: formData.description,
        price: formData.price,
        image: imageResponse ? imageResponse.link : course.image,
      };

      await courseApi.updateCourse(slug, payload);
      alert("Khóa học đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi cập nhật khóa học. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLessonClick = () => {
    navigate(`/course-edit/${slug}`); // Điều hướng đến trang chỉnh sửa bài giảng
  };

  if (!course) {
    return <Typography variant="h6" align="center">Đang tải thông tin khóa học...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ padding: 4, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" mb={3} align="center">
        Chỉnh sửa khóa học
      </Typography>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleEditLessonClick} // Thêm sự kiện khi nhấn nút
          >
            Chỉnh sửa bài giảng
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Tên khóa học"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            helperText="Tên khóa học không được để trống"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            required
            label="Thể loại"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            helperText="Vui lòng chọn thể loại"
          >
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Không có thể loại</MenuItem>
            )}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            helperText="Mô tả khóa học"
          />
        </Grid>
        <Grid item xs={12}>
          <UploadImage
            onPreview={(file, previewUrl) => setFormData({ ...formData, imageFile: file })}
            imagePreviewUrl={course.image}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Giá tiền khóa học"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">₫</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </Button>
        </Grid>

      </Grid>
    </Container>
  );
};

export default EditCourseForm;
