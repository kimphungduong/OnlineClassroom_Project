import { TextField, Button, Container, Box, Typography, Grid2 as Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CourseCard from '~/layouts/components/CourseCard';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';

const cx = classNames.bind(styles);

const MyCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const mockCourses = [
            {
                id: 1,
                title: 'Khóa học 1',
                description: 'Mô tả ngắn gọn về khóa học 1',
                image: 'https://via.placeholder.com/352x195',
                progress: 50,
            },
            {
                id: 2,
                title: 'Khóa học 2',
                description: 'Mô tả ngắn gọn về khóa học 2',
                image: 'https://via.placeholder.com/352x195',
                progress: 75,
            },
            {
                id: 3,
                title: 'Khóa học 3',
                description: 'Mô tả ngắn gọn về khóa học 3',
                image: 'https://via.placeholder.com/352x195',
                progress: 20,
            },
        ];
        setCourses(mockCourses);
        // fetch('/api/my-courses')
        //     .then((response) => response.json())
        //     .then((data) => setCourses(data))
        //     .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    return (
        <Container maxWidth={false} className={cx('fluid')}>
            <Box sx={{ backgroundColor: 'black', color: 'white', width: '100%', py: 2 }}>
                <Container maxWidth="lg">
                    <Typography mt={1} variant="h4" component="h1" gutterBottom>
                        Khóa học của tôi
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ mt: 2 }}>
                <Grid container spacing={4}>
                    {courses.map((course) => (
                        <Grid item key={course.id} xs={12} sm={6} md={4}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
};

export default MyCourses;
