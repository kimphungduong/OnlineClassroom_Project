import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid, Button } from '@mui/material';
import FilterBar from '~/layouts/components/FilterBar';
import CourseCardHorizontal from '~/layouts/components/CourseCardHorizontal';
import { useLocation } from 'react-router-dom';
import { courseApi } from '~/api'; // Import courseApi để gọi API

const Search = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFilter, setShowFilter] = useState(false); // Bộ lọc mặc định ẩn

    const location = useLocation();

    // Lấy từ khóa từ query string
    const searchKeyword = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        if (!searchKeyword) return;

        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                // Gọi API tìm kiếm khóa học theo từ khóa
                const response = await courseApi.searchCourses(searchKeyword);
                const validCourses = response.data.map((course) => ({
                    id: course._id,
                    title: course.name || 'No title available',
                    teacher: course.teacher?.name || 'N/A',
                    rating: course.rating || 0,
                    price: course.price || 0,
                    image: course.image || 'https://via.placeholder.com/352x195',
                    description: course.description || '',
                }));
                console.log(validCourses);
                setCourses(validCourses);
                setFilteredCourses(validCourses);
            } catch (err) {
                setError('Có lỗi xảy ra khi tìm kiếm!');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [searchKeyword]);

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

    return (
        <Container maxWidth="lg">
            {/* Nút ẩn/hiện bộ lọc */}
            <Box sx={{ mt: 4, mb: 2, textAlign: 'right' }}>
                <Button
                    variant="outlined"
                    onClick={() => setShowFilter(!showFilter)}
                    sx={{ borderRadius: 0, borderColor: 'black', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' } }}
                >
                    {showFilter ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </Button>
            </Box>

            {/* Tiêu đề và số lượng kết quả */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    {filteredCourses.length || 0} kết quả tìm kiếm cho "{searchKeyword || '...'}"
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {/* Bộ lọc bên trái */}
                {showFilter && (
                    <Grid item xs={12} md={3}>
                        <FilterBar onFilterChange={handleFilterChange} />
                    </Grid>
                )}

                {/* Kết quả tìm kiếm bên phải */}
                <Grid item xs={12} md={showFilter ? 9 : 12}>
                    {loading ? (
                        <Typography variant="h6">Đang tải...</Typography>
                    ) : error ? (
                        <Typography variant="h6" color="error">{error}</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {filteredCourses.map((course) => (
                                <Grid item xs={12} key={course.id}>
                                    <CourseCardHorizontal course={course} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Search;
