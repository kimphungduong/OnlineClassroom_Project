const Note = require('../models/Note');
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

class NoteService {
    async updateNote(noteId, content){
        try {
            const updatedNote = await Note.findByIdAndUpdate(
                noteId,
                { $set: {content} }, // Dùng $set để đảm bảo các trường hợp update được chỉ định
                { new: true, runValidators: true }
            );            return updatedNote;
        } catch (error) {
            throw new Error('Error updating note: ' + error.message);
        }
    }
    async deleteNote (noteId) {
        try {
            await Note.findByIdAndDelete(noteId);
        } catch (error) {
            throw new Error('Error deleting note: ' + error.message);
        }
    }
    async getNotesGroupedBySections(courseId, userId) {
        try {
            // Lấy tất cả các ghi chú của user
            const notes = await Note.find({ student: userId });
            if (!notes.length) return []; // Không có ghi chú nào
    
            // Lấy tất cả các bài giảng (lessons) được tham chiếu trong notes
            const lessonIds = notes.map(note => note.lesson);
            const lessons = await Lesson.find({ _id: { $in: lessonIds } });
    
            // Lấy thông tin khóa học
            const course = await Course.findById(courseId);
            if (!course) throw new Error("Khóa học không tồn tại.");
    
            // Chuẩn bị kết quả nhóm
            const sectionsGrouped = [];
    
            // Lặp qua từng section trong khóa học
            for (const section of course.sections) {
                const sectionData = {
                    sectionId: section._id.toString(),
                    sectionTitle: section.title,
                    lessons: []
                };
    
                // Lặp qua từng bài giảng trong section
                for (const lessonRef of section.lessons) {
                    const lessonData = lessons.find(lesson => lesson._id.toString() === lessonRef.lessonId.toString());
                    if (!lessonData) continue; // Bỏ qua nếu không tìm thấy bài giảng
    
                    // Lấy ghi chú cho bài giảng này
                    const lessonNotes = notes.filter(note => note.lesson.toString() === lessonRef.lessonId.toString());
    
                    if (lessonNotes.length) {
                        sectionData.lessons.push({
                            lessonId: lessonData._id.toString(),
                            lessonTitle: lessonData.name,
                            lessonSlug: lessonData.slug, // Thêm slug của lesson
                            notes: lessonNotes.map(note => ({
                                content: note.content,
                                createdAt: note.createdAt,
                                time: note.time || null
                            }))
                        });
                    }
                }
    
                // Chỉ thêm section nếu có bài giảng chứa ghi chú
                if (sectionData.lessons.length) {
                    sectionsGrouped.push(sectionData);
                }
            }
    
            return sectionsGrouped;
        } catch (error) {
            console.error("Error fetching notes grouped by sections:", error);
            throw new Error("Không thể lấy danh sách ghi chú theo section và bài giảng.");
        }
    };
    
    
    
    
    
}

module.exports = new NoteService();