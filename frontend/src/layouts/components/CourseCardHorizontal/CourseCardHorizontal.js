import React from 'react';
import classNames from 'classnames/bind';
import { Card, CardContent, Grid, Typography, Box, Rating } from '@mui/material';
import styles from './CourseCardHorizontal.module.scss';

const cx = classNames.bind(styles);

const CourseCardHorizontal = ({ course }) => {
    return (
        <Card className={cx('course-card-horizontal')}>
            <Grid container className={cx('course-card-container')}>
                <Grid item className={cx('course-card-image-container')}>
                    <img src={course.image} alt={course.title} className={cx('course-card-image')} />
                </Grid>
                <Grid item xs className={cx('course-card-content')}>
                    <CardContent>
                        {/* Tiêu đề khóa học */}
                        <Typography variant="h5" component="div" className={cx('course-card-title')}>
                            {course.title}
                        </Typography>

                        {/* Giáo viên */}
                        <Typography mb={2} variant="body2" color="text.secondary" className={cx('course-card-teacher')}>
                            Giáo viên: {course.teacher}
                        </Typography>

                        {/* Mô tả ngắn gọn */}
                        {course.description && (
                            <Typography mb={2} variant="body1" color="text.secondary" className={cx('course-card-description')}>
                                {course.description.length > 100 ? `${course.description.slice(0, 100)}...` : course.description}
                            </Typography>
                        )}

                        {/* Đánh giá */}
                        <Box display="flex" alignItems="center" mb={2}>
                            <Rating value={course.rating} readOnly precision={0.5} />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {course.rating}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
                <Grid item className={cx('course-card-price-container')}>
                    <Typography variant="h6" component="div" className={cx('course-card-price')}>
                        {course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CourseCardHorizontal;