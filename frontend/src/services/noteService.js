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
export const updateNote = async (noteId, content) => {
    try {
        const response = await noteApi.updateNote(noteId, content);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}
export const deleteNote = async (noteId) => {
    try {
        const response = await noteApi.deleteNote(noteId);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}