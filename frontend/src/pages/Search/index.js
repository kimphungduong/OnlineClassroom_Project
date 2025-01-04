import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CourseCardHorizontal from '~/layouts/components/CourseCardHorizontal';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { courseApi } from '~/api'; // Import courseApi để gọi API

const cx = classNames.bind(styles);

const Search = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Lấy từ khóa từ query string
    const searchKeyword = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        if (!searchKeyword) {
            return;
        }

        const fetchCourses = async () => {
            setLoading(true);
            setError(null); // Reset error trước khi gọi API

            try {
                // Gọi API tìm kiếm khóa học theo từ khóa
                const response = await courseApi.searchCourses(searchKeyword);
                setCourses(response.data); // Chỉ cần cập nhật trực tiếp courses với dữ liệu từ API
            } catch (err) {
                setError('Có lỗi xảy ra khi tìm kiếm!');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [searchKeyword]);

    return (
        <Container maxWidth="lg">
            {/* Hiển thị số lượng kết quả */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    {courses.length || 0} kết quả tìm kiếm cho "{searchKeyword || '...'}"
                </Typography>
            </Box>

            {/* Khu vực hiển thị khóa học */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {loading ? (
                    <Typography variant="h6">Đang tải...</Typography>
                ) : error ? (
                    <Typography variant="h6" color="error">{error}</Typography>
                ) : (
                    courses.map((course) => (
                        <Grid item xs={12} key={course.id}>
                            <CourseCardHorizontal course={course} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default Search;
