import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './CourseCardHome.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { cartApi } from '~/api'; // Import cartApi để gọi API
import { notification } from 'antd';
const cx = classNames.bind(styles);

const CourseCardHome = ({ course }) => {
    const [isAdding, setIsAdding] = useState(false); // State to handle button loading state

    const handleAddToCart = async (courseId) => {
        setIsAdding(true); // Set the button to loading state
        try {
            await cartApi.addToCart(courseId); // Call API to add course to cart
            // You can show a success message here, e.g., using a Snackbar or alert
            notification.success({
                message: 'Thêm khóa học vào giỏ hàng thành công',
                description: `Đã thêm khóa học "${course.title}" vào giỏ hàng.`,
            }); 
        } catch (error) {
            // Handle error, show message, etc.
            console.error('Error adding course to cart:', error);
            notification.error({
                message: 'Lỗi khi thêm khóa học vào giỏ hàng',
                description: error.response.data.message || 'Có lỗi xảy ra khi thêm khóa học vào giỏ hàng.',
            });
            
        } finally {
            setIsAdding(false); // Reset loading state
        }
    };
    
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
                        onClick={() => handleAddToCart(course.id)} // Call handleAddToCart on click
                        variant="contained"
                        className={cx('course-card-button')}
                        sx={{ fontSize: '1.2rem' }}
                        disabled={isAdding} // Disable button while adding to cart
                    >
                        {isAdding ? 'Đang thêm...' : 'Thêm giỏ hàng'} {/* Change button text based on loading state */}
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
