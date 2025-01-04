import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';
import TabsComponent from '~/layouts/components/Tabs';
import CourseCardHome from '~/layouts/components/CourseCardHome';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './AllCourse.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const cx = classNames.bind(styles);

const AllCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const mockCourses = [
            {
                id: 1,
                title: 'Khóa học 1',
                teacher: 'Giáo viên A',
                rating: 4.5,
                price: 500000,
                image: 'https://via.placeholder.com/352x195',
            },
            {
                id: 2,
                title: 'Khóa học 2',
                teacher: 'Giáo viên B',
                rating: 4.7,
                price: 650000,
                image: 'https://via.placeholder.com/352x195',
            },
            {
                id: 3,
                title: 'Khóa học 3',
                teacher: 'Giáo viên C',
                rating: 4.2,
                price: 300000,
                image: 'https://via.placeholder.com/352x195',
            },
            {
                id: 4,
                title: 'Khóa học 4',
                teacher: 'Giáo viên D',
                rating: 4.9,
                price: 700000,
                image: 'https://via.placeholder.com/352x195',
            },
            {
                id: 5,
                title: 'Khóa học 5',
                teacher: 'Giáo viên E',
                rating: 4.4,
                price: 700000,
                image: 'https://via.placeholder.com/352x195',
            },
            {
                id: 6,
                title: 'Khóa học 6',
                teacher: 'Giáo viên F',
                rating: 4.2,
                price: 700000,
                image: 'https://via.placeholder.com/352x195',
            },
        ];
        setCourses(mockCourses);
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

export default AllCourse;