import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './CourseCardHome.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CourseCardHome = ({ course }) => {
    return (
        <Card className={cx('course-card')}>
            <img src={course.image} alt={course.title} className={cx('course-card-image')} />
            <CardContent className={cx('course-card-content')}>
                {/* Tiêu đề khóa học (Lớn hơn) */}
                <Typography 
                    variant="h3" 
                    component="div" 
                    className={cx('course-card-title')}
                    sx={{ fontSize: '2rem' }} // Adjust font size
                >
                    {course.title}
                </Typography>

                {/* Tên giáo viên (Nhỏ hơn một chút, nhưng vẫn dễ đọc) */}
                <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    className={cx('course-card-teacher')}
                    sx={{ fontSize: '1.8rem' }} // Adjust font size
                >
                    {course.teacher}
                </Typography>

                {/* Rating (Lớn hơn một chút) */}
                <Box display="flex" alignItems="center" gap={1} className={cx('course-card-rating')}>
                    <Rating value={course.rating} readOnly precision={0.1} sx={{ fontSize: '1.5rem' }} /> {/* Lớn hơn */}
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ fontSize: '1.8rem' }} // Adjust font size
                    >
                        ({course.rating})
                    </Typography>
                </Box>

                {/* Giá tiền (Lớn hơn một chút) */}
                <Typography 
                    variant="h6" 
                    color="text.primary" 
                    className={cx('course-card-price')}
                    sx={{ fontSize: '1.8rem' }} // Adjust font size
                >
                    {course.price ? `${course.price.toLocaleString()} VND` : 'Chưa cập nhật'}
                </Typography>

                {/* Nút hành động */}
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                    <Button
                        component={Link}
                        to={`/courses/${course.id}/details`}
                        variant="contained"
                        className={cx('course-card-button')}
                        sx={{ 
                            fontSize: '1.2rem', // Điều chỉnh kích thước chữ cho nút
                            backgroundColor: '#6C8BB9', // Màu nền xanh dương
                            color: 'white', // Màu chữ trắng
                            '&:hover': {
                                backgroundColor: '#5a7699', // Màu nền khi hover
                            },
                        }}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        component={Link}
                        to={`/courses/${course.id}/buy`}
                        variant="contained"
                        className={cx('course-card-button')}
                        sx={{ 
                            fontSize: '1.2rem', // Điều chỉnh kích thước chữ cho nút
                            backgroundColor: '#6C8BB9', // Màu nền xanh dương
                            color: 'white', // Màu chữ trắng
                            '&:hover': {
                                backgroundColor: '#5a7699', // Màu nền khi hover
                            },
                        }}
                    >
                        Mua ngay
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

CourseCardHome.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        teacher: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default CourseCardHome;