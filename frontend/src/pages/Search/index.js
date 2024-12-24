import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos, FilterList } from '@mui/icons-material';
import CourseCardHome from '~/layouts/components/CourseCardHome';
import CourseCardHorizontal from '~/layouts/components/CourseCardHorizontal';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import FilterBar from '~/layouts/components/FilterBar';

const cx = classNames.bind(styles);

const Search = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(''); // State to store the search keyword

    useEffect(() => {
        const mockCourses = [
            {
                id: 1,
                title: 'Khóa học 1',
                teacher: 'Giáo viên A',
                rating: 4.5,
                price: 500000,
                image: 'https://via.placeholder.com/352x195',
                description: 'Mô tả ngắn gọn về khóa học 1',
            },
            {
                id: 2,
                title: 'Khóa học 2',
                teacher: 'Giáo viên B',
                rating: 4.7,
                price: 650000,
                image: 'https://via.placeholder.com/352x195',
                description: 'Mô tả ngắn gọn về khóa học 2',
            },
            {
                id: 3,
                title: 'Khóa học 3',
                teacher: 'Giáo viên C',
                rating: 4.2,
                price: 300000,
                image: 'https://via.placeholder.com/352x195',
                description: 'Mô tả ngắn gọn về khóa học 3',
            },
            {
                id: 4,
                title: 'Khóa học 4',
                teacher: 'Giáo viên D',
                rating: 4.9,
                price: 700000,
                image: 'https://via.placeholder.com/352x195',
                description: 'Mô tả ngắn gọn về khóa học 4',
            },
            {
                id: 5,
                title: 'Khóa học 5',
                teacher: 'Giáo viên E',
                rating: 4.4,
                price: 700000,
                image: 'https://via.placeholder.com/352x195',
                description: 'Mô tả ngắn gọn về khóa học 5',
            },
            {
                id: 6,
                title: 'Khóa học 6',
                teacher: 'Giáo viên F',
                rating: 4.2,
                price: 700000,
                image: 'https://via.placeholder.com/352x195',
                description: 'Mô tả ngắn gọn về khóa học 6',
            },
        ];
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
    }, []);

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

    const handleSearchChange = (keyword) => {
        setSearchKeyword(keyword);
        const filtered = courses.filter((course) =>
            course.title.toLowerCase().includes(keyword.toLowerCase())
        );
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
            {/* Display search keyword and number of results */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    {filteredCourses.length} kết quả tìm kiếm cho "{searchKeyword}"
                </Typography>
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

export default Search;