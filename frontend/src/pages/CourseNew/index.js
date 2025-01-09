import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Typography, Grid, InputAdornment, Container } from "@mui/material";
import axios from "axios";
import { UploadImage } from "../../components/UploadFile"; // Chỉ dùng UploadImage để xử lý ảnh
import subjectApi from "../../api/subjectApi";
import uploadApi from "../../api/uploadApi";
import courseApi from "../../api/courseApi";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    subject: "",
    description: "",
    price: "",
    imageFile: null, // Dữ liệu ảnh được truyền từ UploadImage
  });

  const [categories, setCategories] = useState([]); // Mảng các thể loại
  const [loading, setLoading] = useState(false); 


  useEffect(() => {
    // Hàm fetch categories từ API
    const fetchCategories = async () => {
      try {
        const response = await subjectApi.getAllSubject();
        setCategories(response.data); // Giả sử API trả về mảng thể loại
      } catch (error) {
        console.error("Lỗi khi lấy thể loại:", error);
        alert("Không thể lấy thể loại, vui lòng thử lại.");
      }
    };

    fetchCategories(); // Gọi hàm fetch khi component render
  }, []);

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
    if (formData.price <= 0) {
      alert("Giá tiền phải lớn hơn 0.");
      return;
    }
  
    if (formData.name.trim().length < 5 || formData.name.trim().length > 30) {
      alert("Tên khóa học phải từ 5 đến 30 ký tự.");
      return;
    }
    setLoading(true);
    try {
      // Upload ảnh nếu có
      const imageResponse = formData.imageFile
        ? await uploadFile(formData.imageFile)
        : null;

      // Tạo payload để gửi
      const payload = {
        name: formData.courseName,
        subject: formData.category, // Dùng _id của thể loại
        description: formData.description,
        price: formData.price,
        rating: 0, 
        image: imageResponse ? imageResponse.link : null, // Link ảnh từ API upload
      };
    //   alert(JSON.stringify(payload));
      // Gửi dữ liệu lưu khóa học
      await courseApi.createCourse(payload);

      alert("Khóa học đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu khóa học:", error.response?.data || error.message);
      alert("Có lỗi xảy ra khi thêm khóa học. Vui lòng thử lại.");
    } finally {
        setLoading(false); // Kết thúc loading sau khi xong hoặc có lỗi
      }
  };

  return (
    <Container maxWidth="md" sx={{ padding: 4, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" mb={3} align="center">
        Thêm khóa học mới
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Tên khóa học"
            name="courseName"
            value={formData.courseName}
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
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            helperText="Vui lòng chọn thể loại"
          >
            {/* Duyệt qua danh sách categories để hiển thị tên thể loại */}
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
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};


export default AddCourseForm;
