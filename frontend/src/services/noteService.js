import {noteApi} from '~/api';

export const getNotes = async (courseSlug,lessonId) => {
    try {
        const response = await courseApi.getNotes(courseSlug ,lessonId);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}