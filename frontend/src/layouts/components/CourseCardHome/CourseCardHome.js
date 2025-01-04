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
            <img 
                src={course.image || 'https://via.placeholder.com/352x195'} 
                alt={course.title || 'No title'} 
                className={cx('course-card-image')} 
            />
            <CardContent className={cx('course-card-content')}>
                {/* Tiêu đề khóa học */}
                <Typography 
                    variant="h3" 
                    component="div" 
                    className={cx('course-card-title')}
                    sx={{ fontSize: '2rem' }}
                >
                    {course.title || 'No title available'}
                </Typography>

                {/* Tên giáo viên */}
                <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    className={cx('course-card-teacher')}
                    sx={{ fontSize: '1.8rem' }}
                >
                    {course.teacher || 'Unknown teacher'}
                </Typography>

                {/* Rating */}
                <Box display="flex" alignItems="center" gap={1} className={cx('course-card-rating')}>
                    <Rating value={course.rating || 0} readOnly precision={0.1} sx={{ fontSize: '1.5rem' }} />
                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ fontSize: '1.8rem' }}
                    >
                        ({course.rating || 0})
                    </Typography>
                </Box>

                {/* Giá tiền */}
                <Typography 
                    variant="h6" 
                    color="text.primary" 
                    className={cx('course-card-price')}
                    sx={{ fontSize: '1.8rem' }}
                >
                    {course.price ? `${course.price.toLocaleString()} VND` : 'Chưa cập nhật'}
                </Typography>

                {/* Nút hành động */}
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                    <Button
                        component={Link}
                        to={`/detail/${course.slug || 'default-slug'}`}
                        variant="contained"
                        className={cx('course-card-button')}
                        sx={{ fontSize: '1.2rem' }}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        component={Link}
                        to={`/buy/${course.slug || 'default-slug'}`}
                        variant="contained"
                        className={cx('course-card-button')}
                        sx={{ fontSize: '1.2rem' }}
                    >
                        Thêm giỏ hàng
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

CourseCardHome.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        teacher: PropTypes.string,
        rating: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        slug: PropTypes.string,
    }).isRequired,
};

export default CourseCardHome;
