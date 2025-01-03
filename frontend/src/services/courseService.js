import { courseApi } from '~/api';

export const getListCourse = async () => {
    try {
        const response = await courseApi.getListCourse();
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const getCourse = async (slug) => {
    try {
        const response = await courseApi.getCourse(slug);
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
};

export const getLesson = async (courseSlug, lessonSlug) => {
    try {
        const response = await courseApi.getLesson(courseSlug, lessonSlug);
        return response.data;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        throw error;
    }
};

export const getCoursesBySubject = async (subjectSlug) => {
    try {
        const response = await courseApi.getCoursesBySubject(subjectSlug);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses by subject:', error);
        throw error;
    }
};

export const searchCourses = async (query) => {
    try {
        const response = await courseApi.searchCourses(query); // gọi API tìm kiếm
        return response.data;
    } catch (error) {
        console.error('Error searching courses:', error);
        throw error;
    }
};