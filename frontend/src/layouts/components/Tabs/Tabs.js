import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import courseApi from '~/api/courseApi';
import styles from './Tabs.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TabsComponent({ onCoursesFetched = () => {} }) { // Mặc định là hàm rỗng
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const subjects = [
        { id: 'tat-ca', name: 'Tất cả' },
        { id: 'toan-hoc', name: 'Toán học' },
        { id: 'vat-ly', name: 'Vật lý' },
        { id: 'hoa-hoc', name: 'Hóa học' },
        { id: 'tieng-anh', name: 'Tiếng Anh' },
        { id: 'sinh-hoc', name: 'Sinh học' },
        { id: 'tin-hoc', name: 'Tin học' },
    ];

    useEffect(() => {
        const currentSubjectId = location.pathname.split('/')[2] || 'tat-ca';
        const currentIndex = subjects.findIndex((subject) => subject.id === currentSubjectId);
        setValue(currentIndex === -1 ? 0 : currentIndex);
    }, [location]);

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        const subjectId = subjects[newValue].id;

        try {
            if (subjectId === 'tat-ca') {
                navigate('/');
                const allCourses = await courseApi.getListCourse();
                onCoursesFetched(allCourses.data); // Cập nhật danh sách khóa học
            } else {
                navigate(`/subject/${subjectId}`);
                const subjectCourses = await courseApi.getCoursesBySubject(subjectId);
                onCoursesFetched(subjectCourses.data); // Cập nhật danh sách khóa học theo môn
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="subjects tabs"
                centered
                className={cx('tabsContainer')}
            >
                {subjects.map((subject, index) => (
                    <Tab key={index} label={subject.name} className={cx('tab')} />
                ))}
            </Tabs>
        </Box>
    );
}

export default TabsComponent;
