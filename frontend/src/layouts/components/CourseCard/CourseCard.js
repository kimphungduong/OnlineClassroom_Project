import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CourseCard = ({ course }) => {
    return (
        <Card className={cx('course-card')}>
            <img src={course.image} alt={course.name} className={cx('course-card-image')} />
            <CardContent className={cx('course-card-content')}>
                {/* Tiêu đề khóa học */}
                <Typography variant="h5" component="div" className={cx('course-card-title')}>
                    {course.name}
                </Typography>

                {/* Mô tả ngắn gọn */}
                <Typography mb={2} variant="h6" color="text.secondary" className={cx('course-card-description')}>
                    {course.description.length > 100 ? `${course.description.slice(0, 100)}...` : course.description}
                </Typography>

                {/* Thanh tiến độ */}
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Typography variant="h6" color="text.secondary">
                        Tiến độ học tập
                    </Typography>
                    <LinearProgress variant="determinate" value={course.progress} />
                </Box>

                {/* Nút hành động */}
                <Box display="flex" gap={2}>
                    <Button
                        component={Link}
                        to={`/courses/${course.id}/learn`}
                        variant="contained"
                        color="success"
                        className={cx('course-card-button')}
                        sx={{ fontSize: '1.2rem' }}
                    >
                        Tiến hành học
                    </Button>
                    <Button
                        component={Link}
                        to={`/courses/${course.id}/forum`}
                        variant="contained"
                        color="primary"
                        className={cx('course-card-button')}
                        sx={{ fontSize: '1.2rem' }}
                    >
                        Diễn đàn
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
    }).isRequired,
};

export default CourseCard;
