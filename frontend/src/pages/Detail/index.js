import React, { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useParams } from 'react-router-dom'; // Import useParams
import { getCourse } from '~/services/courseService';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { notification } from 'antd'; // Import notification
import { cartApi } from '~/api'; // Import cartApi
import { paymentApi } from '~/api'; // Import paymentApi
import {
  Container,
  Box,
  Typography,
  Button,
  CardMedia,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseDetailPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const [course, setCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // State cho trạng thái thêm giỏ hàng
  const navigate = useNavigate();

  // Fetch thông tin khóa học khi component được mount
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const courseData = await getCourse(slug); // Truyền slug động
        setCourse(courseData); // Cập nhật dữ liệu khóa học vào state
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourseDetail();
  }, [slug]);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async (courseId) => {
    setIsAdding(true); // Bắt đầu trạng thái loading
    try {
      await cartApi.addToCart(courseId); // Gọi API thêm giỏ hàng
      notification.success({
        message: 'Thêm khóa học vào giỏ hàng thành công',
        description: `Đã thêm khóa học "${course.name}" vào giỏ hàng.`,
      });
    } catch (error) {
      console.error('Error adding course to cart:', error);
      notification.error({
        message: 'Thêm giỏ hàng thất bại',
        description: 'Đã có lỗi xảy ra, vui lòng thử lại.',
      });
    } finally {
      setIsAdding(false); // Kết thúc trạng thái loading
    }
  };

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!course) {
    return <Typography variant="h6" align="center">Đang tải thông tin khóa học...</Typography>;
  }

  // Cập nhật dữ liệu khi course có đầy đủ các trường
  const benefits = course.description || []; // Nếu benefits không có, gán là mảng rỗng
  const handleBuyCourseClick = async () => {
    //Chuyển hướng đến trang thanh toán
    try {
      //Gọi api thêm giỏ hàng
      const cart = await cartApi.addToCart(course._id);

      const response = await paymentApi.create([course._id]);
      const paymentId = response.data._id;
      const qrCode = response.data.qrCode;
      
      navigate(`/payment/${paymentId}`, { state: { qrCode, selectedCourses: [course._id]  } });
      
      } catch (error) {
      if (error.response.data.message=="Lỗi cập nhật giỏ hàng"){
        const response = await paymentApi.create([course._id]);
        const paymentId = response.data._id;
        const qrCode = response.data.qrCode;
      
        navigate(`/payment/${paymentId}`, { state: { qrCode, selectedCourses: [course._id]  } });
      
      }
    }
  }
  return (
    <Container maxWidth={false} disableGutters sx={{ padding: '0', margin: '0', position: 'relative' }}>
      {/* Phần 1: Toàn màn hình */}
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '40px 20px',
          position: 'relative',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ ml: 30, mt: 3, maxWidth: '500px', fontWeight: 'bold' }}>
          {course.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 30, maxWidth: '500px', mt: 2 }}>
          {course.teacher?.name || 'Chưa có thông tin giáo viên'}
        </Typography>
        <Typography variant="body1" paragraph sx={{ ml: 30, maxWidth: '600px', mt: 2 }}>
          {course.description}
        </Typography>
        <Box display="flex" alignItems="center" gap={2} sx={{ ml: 30, maxWidth: '600px', mt: 2 }}>
          <Typography variant="body1">
            {course.rating}
          </Typography>
          <Rating
            value={course.rating}
            precision={0.5}
            readOnly
            emptyIcon={<StarBorderIcon style={{ color: '#fff' }} fontSize="inherit" />}
          />
        </Box>
        <Typography variant="body1" paragraph sx={{ mt: 2, ml: 30 }}>
          {course.sections.length} Phần
        </Typography>
      </Box>

      {/* Phần 2: Bạn sẽ học được gì - Toàn màn hình */}
      <Box
        sx={{
          padding: '25px 30px 40px 30px',
          position: 'relative',
          width: '60%', // Chiếm toàn bộ chiều rộng màn hình
          maxWidth: '600px', // Đặt giới hạn tối đa để tránh nội dung quá rộng
          margin: '30px 250px', // Canh giữa
          border: '0.7px solid rgba(29, 23, 23, 0.6)', // Viền đậm màu tối
          boxShadow: '0px 4px 10px rgba(57, 49, 49, 0.1)', // Hiệu ứng bóng
        }}
      >
        <Typography variant="h5" gutterBottom fontSize="36" fontWeight="bold"  >
          Bạn sẽ học được gì?
        </Typography>
        {/* Lợi ích khóa học */}
        {Array.isArray(benefits) && benefits.length > 0 ? (
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            {benefits.map((benefit, index) => (
              <li key={index}>
                <Typography variant="body1">{benefit}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '15px' }}>
              <Typography variant="body1">Nâng cao kiến thức chuyên môn và kỹ năng thực tế.</Typography>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Typography variant="body1">Hiểu rõ cách áp dụng lý thuyết vào thực tiễn.</Typography>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Typography variant="body1">Cải thiện khả năng làm việc nhóm và giao tiếp hiệu quả.</Typography>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Typography variant="body1">Tăng cường tư duy sáng tạo và giải quyết vấn đề.</Typography>
            </li>
            <li>
              <Typography variant="body1">Được định hướng phát triển sự nghiệp lâu dài.</Typography>
            </li>
          </ul>
        )}
      </Box>

      {/* Phần 3: Box nổi - Đè lên */}
      <Box
        sx={{
          width: '320px',
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: '#fff',
          boxShadow: 3,
          padding: '5px',
          mt: 4,
          mr: 30,
          minHeight: '400px',
        }}
      >
        <CardMedia
          component="img"
          image={course.image}
          alt={course.name}
          sx={{ marginBottom: '20px', padding: '0px', height: '200px', width:'310px' }}
        />
        <Typography variant="h5" color="black" fontWeight="bold" fontSize="28px" mb={2} padding="0px 10px">
          {course.price.toLocaleString()} VND
        </Typography>
        <Box display="flex" gap={1} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            flex: 5,
            margin: '5px',
            fontSize: '1.8rem', // Tăng kích thước chữ
            fontWeight: 'bold',
            background: 'rgb(13, 58, 95))', // Màu xanh sáng hơn
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(45deg, rgb(17, 76, 127), rgb(31, 88, 135))', // Hiệu ứng màu khi hover
            },
          }}
          onClick={() => handleAddToCart(course.id)}
          disabled={isAdding}
        >
          {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
        </Button>

          {/* <Button
            variant="outlined"
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FavoriteBorderIcon />
          </Button> */}
        </Box>
        <Button variant="contained" color="secondary" fullWidth onClick={() => handleBuyCourseClick()}>
          Mua khóa học
        </Button>
        <Box sx={{ marginTop: '20px', paddingLeft: '10px' }}>
          <Typography variant="h7" fontWeight="bold" gutterBottom >
            Khóa học bao gồm:
          </Typography>
          <ul style={{ listStyle: 'none', paddingLeft: '5px' }}>
            <li style={{ display: 'flex', alignItems: 'center', marginTop: '15px' , marginBottom: '15px' }}>
              <AccessTimeIcon sx={{ marginRight: '10px', color: '#555' }} />
              <Typography variant="body1">Truy cập khóa học trọn đời</Typography>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <SupportAgentIcon sx={{ marginRight: '10px', color: '#555' }} />
              <Typography variant="body1">Tương tác trực tiếp với giáo viên</Typography>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '63px' }}>
              <VerifiedIcon sx={{ marginRight: '10px', color: '#555' }} />
              <Typography variant="body1">Các chứng nhận tham gia</Typography>
            </li>
          </ul>
        </Box>

      </Box>
    </Container>
  );
};

export default CourseDetailPage;
