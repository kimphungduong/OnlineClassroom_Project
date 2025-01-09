import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos, FilterList } from '@mui/icons-material';
import CourseCardHome from '~/layouts/components/CourseCardHome';
import CourseCardHorizontal from '~/layouts/components/CourseCardHorizontal';
import classNames from 'classnames/bind';
import styles from './CoursesOfOneSubject.module.scss';
import FilterBar from '~/layouts/components/FilterBar';
import { useParams } from 'react-router-dom';
import { getCoursesBySubject } from '~/services/courseService';

const cx = classNames.bind(styles);

const CoursesOfOneSubject = () => {
    const { subjectName } = useParams();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const subjectCourses = await getCoursesBySubject(subjectName);
                const validCourses = subjectCourses.map((course) => ({
                    id: course._id,
                    title: course.name || 'No title available',
                    teacher: course.teacher?.name || 'N/A', // Lấy tên giáo viên từ object teacher
                    rating: course.rating || 0,
                    price: course.price || 0,
                    image: course.image || 'https://via.placeholder.com/352x195',
                    description: course.description || '', // Nếu cần sử dụng
                    slug: course.slug, // Đảm bảo truyền slug để điều hướng
                }));
                setCourses(validCourses);
                setFilteredCourses(validCourses);
            } catch (error) {
                console.error('Error fetching courses by subject:', error);
            }
        };
    
        fetchCourses();
    }, [subjectName]);
    

    const handleFilterChange = (filters) => {
        const { rating, price } = filters;
        const filtered = courses.filter((course) => {
            return (
                (rating ? course.rating >= rating : true) &&
                (price ? course.price >= price[0] && course.price <= price[1] : true)
            );
        });
        setFilteredCourses(filtered);
    };

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
            {/* Top Section: Các khóa học nổi bật */}
            <Box sx={{ mt: 0, position: 'relative' }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Các khóa học nổi bật
                </Typography>
                <Slider {...settings}>
                    {courses.map((course) => (
                        <Box key={course.id} px={2}>
                            <CourseCardHome course={course} />
                        </Box>
                    ))}
                </Slider>
            </Box>

            {/* Filter Toggle Button and Results Count */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 0,
                        borderColor: 'black',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: 'black',
                            color: 'white',
                        },
                    }}
                    startIcon={<FilterList />}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    Filter
                </Button>
                <Typography variant="body1">
                    {filteredCourses.length} kết quả
                </Typography>
            </Box>

            {/* Bottom Section: Filter and Course Information */}
            <Grid container spacing={2}>
                {showFilter && (
                    <Grid item xs={12} md={3}>
                        <FilterBar onFilterChange={handleFilterChange} />
                    </Grid>
                )}
                <Grid item xs={12} md={showFilter ? 9 : 12}>
                    <Box sx={{ mt: 4, position: 'relative' }}>
                        <Grid container spacing={2}>
                            {filteredCourses.map((course) => (
                                <Grid item xs={12} key={course.id}>
                                    <CourseCardHorizontal course={course} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CoursesOfOneSubject;