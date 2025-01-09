import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';
import CourseCardHome from '~/layouts/components/CourseCardHome';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { getListCourse } from '~/services/courseService';
import { courseApi } from '~/api';

const cx = classNames.bind(styles);

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [recommendedCourses, setRecommendedCourses] = useState([]); // State cho đề xuất

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const fetchedCourses = await getListCourse();
                const normalizedCourses = fetchedCourses.map(course => ({
                    id: course._id,
                    title: course.name,
                    teacher: course.teacher?.name || 'Chưa cập nhật',
                    rating: course.rating,
                    price: course.price,
                    image: course.image,
                    slug: course.slug,
                }));
                setCourses(normalizedCourses);
            } catch (error) {
                console.error('Lỗi khi tải danh sách khóa học:', error);
            }
        };

            
        const fetchRecommendations = async () => {
            try {
            // Gọi API lấy danh sách đề xuất
            const response = await courseApi.getRecommendedCourses();
            const normalizedCourses = response.data.data.map(course => ({
                id: course._id,
                title: course.name,
                teacher: course.teacher?.name || 'Chưa cập nhật',
                rating: course.rating,
                price: course.price,
                image: course.image,
                slug: course.slug,
            }));
            setRecommendedCourses(normalizedCourses || []);
            } catch (error) {
            console.error("Error fetching recommendations:", error.response?.data || error.message);
            }
        };

        fetchRecommendations();
        fetchCourses();
    }, []);

    const NextArrow = ({ onClick }) => (
        <div onClick={onClick} className={cx('arrow', 'next-arrow')}>
            <ArrowForwardIos fontSize="large" />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div onClick={onClick} className={cx('arrow', 'prev-arrow')}>
            <ArrowBackIos fontSize="large" />
        </div>
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Container maxWidth="lg">
            <Box display="flex" alignItems="center" mb={4}>
                <img className={cx('user-avatar')} src={images.avatar} alt="Nguyen Van A" />
                <Typography variant="h6" className={cx('welcome-message')} ml={2}>
                    Chào mừng quay lại
                </Typography>
            </Box>
            <Box sx={{ maxWidth: '100%', marginBottom: '20px' }}>
                <img className={cx('home')} src={images.home} alt="Introduce" style={{ maxHeight: '300px', width: '100%' }} />
            </Box>
            
            <Box sx={{ mt: 4, position: 'relative' }}>
                <Typography variant="h5" gutterBottom>
                    Các khóa học phổ biến
                </Typography>
                <Slider {...settings}>
                    {courses.map((course) => (
                        <Box key={course.id} px={2}>
                            <CourseCardHome course={course} />
                        </Box>
                    ))}
                </Slider>
            </Box>
            
            {recommendedCourses.length > 0 && (
            <Box sx={{ mt: 4, position: 'relative' }}>
                <Typography variant="h5" gutterBottom>
                Đề xuất cho bạn
                </Typography>
                <Slider {...settings}>
                {recommendedCourses.map((course) => (
                    <Box key={course._id} px={2}>
                    <CourseCardHome course={course} />
                    </Box>
                ))}
                </Slider>
            </Box>
            )}
            <Box sx={{ mt: 4, position: 'relative' }}>
                <Typography variant="h5" gutterBottom>
                    Các khóa học cho người mới bắt đầu
                </Typography>
                <Slider {...settings}>
                    {courses.map((course) => (
                        <Box key={course.id} px={2}>
                            <CourseCardHome course={course} />
                        </Box>
                    ))}
                </Slider>
            </Box>
            <Box sx={{ mt: 4, position: 'relative' }}>
                <Typography variant="h5" gutterBottom>
                    Các khóa học đánh giá cao
                </Typography>
                <Slider {...settings}>
                    {courses.map((course) => (
                        <Box key={course.id} px={2}>
                            <CourseCardHome course={course} />
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Container>
    );
};

export default Home;