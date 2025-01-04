import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Typography, Grid, InputAdornment, Container } from "@mui/material";
import axios from "axios";
import { UploadImage } from "../../components/UploadFile"; // Chỉ dùng UploadImage để xử lý ảnh
import subjectApi from "../../api/subjectApi";
import uploadApi from "../../api/uploadApi";
import courseApi from "../../api/courseApi";
import { useParams } from "react-router-dom"; // Adjusted to use useParams

const EditCourseForm = () => {
  // const { courseSlug } = useParams().slug; // Correct usage of useParams
  const courseSlug = 'ly-hoa'
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    price: "",
    image: null, // Dữ liệu ảnh được truyền từ UploadImage
  });

  const [categories, setCategories] = useState([]); // Mảng các thể loại
  const [loading, setLoading] = useState(false); 
  const [course, setCourse] = useState(null); // Dữ liệu khóa học cần chỉnh sửa

  // Hàm fetch categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await subjectApi.getAllSubject();
        console.log(response.data);
        setCategories(response.data); // Giả sử API trả về mảng thể loại
      } catch (error) {
        console.error("Lỗi khi lấy thể loại:", error);
        alert("Không thể lấy thể loại, vui lòng thử lại.");
      }
    };
    
    fetchCategories(); // Gọi hàm fetch khi component render
  }, []);

  // Fetch thông tin khóa học khi component mount hoặc khi courseSlug thay đổi
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseSlug) return; // Kiểm tra nếu courseSlug không có

      try {
        const response = await courseApi.getCourseInfo(courseSlug);
        const courseData = response.data;
        console.log(courseData);
        setCourse(courseData);
        setFormData({
          name: courseData.name,
          subject: courseData.subject, // Lấy ID thể loại từ courseData
          description: courseData.description,
          price: courseData.price,
          image: courseData.image, // Chưa xử lý ảnh tại đây, để xử lý khi người dùng thay đổi
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error);
        alert("Không thể lấy thông tin khóa học.");
      }
    };

    fetchCourseDetails(); // Gọi hàm fetch thông tin khóa học
  }, [courseSlug]); // Dựa vào courseSlug để fetch lại mỗi khi courseSlug thay đổi

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm upload file
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file); // `file` là file ảnh từ UploadImage

      const response = await uploadApi.uploadImage(formData);
      return response.data; // Giả sử API trả về link của ảnh
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Upload ảnh nếu có
      const imageResponse = formData.imageFile
        ? await uploadFile(formData.imageFile)
        : null;

      // Tạo payload để gửi
      const payload = {
        name: formData.name,
        subject: formData.subject, // Dùng _id của thể loại
        description: formData.description,
        price: formData.price,
        image: imageResponse ? imageResponse.link : course.image, // Giữ lại link ảnh cũ nếu không thay đổi
      };

      // Gửi dữ liệu cập nhật khóa học
      await courseApi.updateCourse(courseSlug, payload);

      alert("Khóa học đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi cập nhật khóa học. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Kết thúc loading sau khi xong hoặc có lỗi
    }
  };

  // Nếu đang load khóa học, hiển thị loading
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
          imagePreviewUrl={course.image} // Truyền link ảnh cũ từ API
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
            disabled={loading} // Disable button when loading
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditCourseForm;
