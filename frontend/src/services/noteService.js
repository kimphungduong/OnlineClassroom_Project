import {noteApi} from '~/api';

export const getNotes = async (courseSlug,lessonId) => {
    try {
        const response = await noteApi.getNotes(courseSlug ,lessonId);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

export const addNote = async (lessonId, content, time) => {
    try {
        const response = await noteApi.addNote(lessonId, content, time);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}