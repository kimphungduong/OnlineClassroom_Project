import React from 'react';
import classNames from 'classnames/bind';
import { Card, CardContent, Grid, Typography, Box, Rating } from '@mui/material';
import styles from './CourseCardHorizontal.module.scss';

const cx = classNames.bind(styles);

const CourseCardHorizontal = ({ course }) => {
    return (
        <Card className={cx('course-card-horizontal')}>
            <Grid container className={cx('course-card-container')}>
                {/* Hình ảnh khóa học */}
                <Grid item className={cx('course-card-image-container')}>
                    <img 
                        src={course.image || 'https://via.placeholder.com/352x195'} 
                        alt={course.title || 'No title'} 
                        className={cx('course-card-image')} 
                    />
                </Grid>
                <Grid item xs className={cx('course-card-content')}>
                    <CardContent>
                        {/* Tiêu đề khóa học */}
                        <Typography variant="h5" component="div" className={cx('course-card-title')}>
                            {course.name || 'No title available'}
                        </Typography>

                        {/* Giáo viên */}
                        <Typography mb={2} variant="body2" color="text.secondary" className={cx('course-card-teacher')}>
                            Giáo viên: {course.teacher?.name || 'Unknown teacher'} {/* Chỉ render tên giáo viên */}
                        </Typography>

                        {/* Mô tả ngắn gọn */}
                        {course.description && (
                            <Typography mb={2} variant="body1" color="text.secondary" className={cx('course-card-description')}>
                                {course.description.length > 100 ? `${course.description.slice(0, 100)}...` : course.description}
                            </Typography>
                        )}

                        {/* Đánh giá */}
                        <Box display="flex" alignItems="center" mb={2}>
                            <Rating value={course.rating || 0} readOnly precision={0.5} />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {course.rating || 0}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>

                {/* Giá tiền */}
                <Grid item className={cx('course-card-price-container')}>
                    <Typography variant="h6" component="div" className={cx('course-card-price')}>
                        {course.price 
                            ? course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) 
                            : 'Chưa cập nhật'}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};


export default CourseCardHorizontal;