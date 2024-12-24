import { TextField, Button, Container, Box, Typography, Grid2 as Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CourseCard from '~/layouts/components/CourseCard';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import { getListCourse } from '~/services/courseService';


const cx = classNames.bind(styles);

const MyCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getListCourse();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
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
                        <Grid item key={course._id} xs={12} sm={6} md={4}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
};

export default MyCourses;
